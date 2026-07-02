import { useEffect, useMemo, useState } from "react";
import Button from "../../components/ui/Button/Button.jsx";
import SEO from "../../components/seo/SEO.jsx";
import { isSupabaseConfigured, supabase } from "../../lib/supabaseClient.js";
import { adminResources, getEmptyRecord } from "./adminConfig.js";

const resourceKeys = Object.keys(adminResources);

function normalizeFormValue(field, value) {
  if (field.type !== "json") return value || "";
  if (typeof value === "string") return value;
  return JSON.stringify(value || [], null, 2);
}

function parsePayload(fields, formValues) {
  const payload = {};

  for (const field of fields) {
    const value = formValues[field.name];
    if (field.type === "json") {
      payload[field.name] = value ? JSON.parse(value) : [];
    } else {
      payload[field.name] = value || null;
    }
  }

  return payload;
}

export default function AdminDashboard() {
  const [activeResource, setActiveResource] = useState("posts");
  const resource = adminResources[activeResource];
  const emptyRecord = useMemo(
    () => getEmptyRecord(resource.fields),
    [resource.fields],
  );
  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [formValues, setFormValues] = useState(emptyRecord);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const selectedItem = items.find((item) => item.id === selectedId);

  useEffect(() => {
    setSelectedId(null);
    setFormValues(emptyRecord);
    setStatus("");
    loadItems();
  }, [activeResource]);

  async function loadItems() {
    if (!isSupabaseConfigured) {
      setStatus("Supabase ainda nao esta configurado nas variaveis de ambiente.");
      return;
    }

    setIsLoading(true);
    const { data, error } = await supabase
      .from(resource.table)
      .select("*")
      .order(resource.orderBy, { ascending: false });
    setIsLoading(false);

    if (error) {
      setStatus(`Erro ao carregar ${resource.label.toLowerCase()}: ${error.message}`);
      return;
    }

    setItems(data || []);
  }

  function startCreate() {
    setSelectedId(null);
    setFormValues(emptyRecord);
    setStatus("");
  }

  function startEdit(item) {
    const nextValues = {};
    for (const field of resource.fields) {
      nextValues[field.name] = normalizeFormValue(field, item[field.name]);
    }
    setSelectedId(item.id);
    setFormValues(nextValues);
    setStatus("");
  }

  function updateField(name, value) {
    setFormValues((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("");

    if (!isSupabaseConfigured) {
      setStatus("Configure o Supabase antes de salvar.");
      return;
    }

    let payload;
    try {
      payload = parsePayload(resource.fields, formValues);
    } catch (_error) {
      setStatus("Revise os campos em JSON. O formato precisa ser valido.");
      return;
    }

    setIsSaving(true);
    const query = selectedId
      ? supabase.from(resource.table).update(payload).eq("id", selectedId).select()
      : supabase.from(resource.table).insert(payload).select();
    const { data, error } = await query;
    setIsSaving(false);

    if (error) {
      setStatus(`Erro ao salvar: ${error.message}`);
      return;
    }

    const savedItem = data?.[0];
    setStatus(`${resource.singular} salvo com sucesso.`);
    await loadItems();
    if (savedItem) startEdit(savedItem);
  }

  async function handleDelete(item) {
    const confirmed = window.confirm(`Excluir "${item.title}"?`);
    if (!confirmed) return;

    setStatus("");
    const { error } = await supabase.from(resource.table).delete().eq("id", item.id);

    if (error) {
      setStatus(`Erro ao excluir: ${error.message}`);
      return;
    }

    setStatus(`${resource.singular} excluido com sucesso.`);
    startCreate();
    await loadItems();
  }

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  return (
    <>
      <SEO
        title="Painel administrativo"
        description="Painel administrativo para gerenciar conteudos."
        path="/admin"
        robots="noindex, nofollow"
      />
      <main className="admin-shell">
        <aside className="admin-sidebar" aria-label="Navegacao administrativa">
          <div>
            <p className="eyebrow">Admin</p>
            <h1>Painel</h1>
          </div>
          <nav className="admin-tabs">
            {resourceKeys.map((key) => (
              <button
                className={key === activeResource ? "is-active" : ""}
                key={key}
                type="button"
                onClick={() => setActiveResource(key)}
              >
                {adminResources[key].label}
              </button>
            ))}
          </nav>
          <Button as="button" variant="secondary" type="button" onClick={handleLogout}>
            Sair
          </Button>
        </aside>

        <section className="admin-main" aria-labelledby="admin-resource-title">
          <div className="admin-header">
            <div>
              <p className="eyebrow">Conteudo</p>
              <h2 id="admin-resource-title">{resource.label}</h2>
              <p>{resource.description}</p>
            </div>
            <Button as="button" type="button" onClick={startCreate}>
              Novo {resource.singular}
            </Button>
          </div>

          {status && <p className="admin-status">{status}</p>}

          <div className="admin-grid">
            <div className="admin-list" aria-label={`Lista de ${resource.label}`}>
              {isLoading && <p className="meta">Carregando...</p>}
              {!isLoading && items.length === 0 && (
                <p className="meta">Nenhum registro encontrado.</p>
              )}
              {items.map((item) => (
                <article
                  className={`admin-list-item ${item.id === selectedId ? "is-active" : ""}`.trim()}
                  key={item.id}
                >
                  <button type="button" onClick={() => startEdit(item)}>
                    <strong>{item.title || "Sem titulo"}</strong>
                    <span>{item.slug}</span>
                  </button>
                  <button
                    className="admin-delete"
                    type="button"
                    onClick={() => handleDelete(item)}
                  >
                    Excluir
                  </button>
                </article>
              ))}
            </div>

            <form className="admin-editor" onSubmit={handleSubmit}>
              <div className="admin-editor-title">
                <h3>{selectedItem ? "Editar registro" : "Novo registro"}</h3>
                {selectedItem && <span className="meta">ID: {selectedItem.id}</span>}
              </div>

              <div className="admin-form-grid">
                {resource.fields.map((field) => (
                  <div className="field" key={field.name}>
                    <label htmlFor={`${activeResource}-${field.name}`}>
                      {field.label}
                    </label>
                    {field.type === "textarea" || field.type === "json" ? (
                      <textarea
                        className="textarea"
                        id={`${activeResource}-${field.name}`}
                        name={field.name}
                        value={formValues[field.name] || ""}
                        placeholder={field.placeholder}
                        onChange={(event) => updateField(field.name, event.target.value)}
                        required={field.required}
                      />
                    ) : (
                      <input
                        className="input"
                        id={`${activeResource}-${field.name}`}
                        name={field.name}
                        type={field.type}
                        value={formValues[field.name] || ""}
                        onChange={(event) => updateField(field.name, event.target.value)}
                        required={field.required}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="admin-actions">
                <Button as="button" type="submit" disabled={isSaving}>
                  {isSaving ? "Salvando..." : "Salvar"}
                </Button>
                <Button as="button" variant="secondary" type="button" onClick={startCreate}>
                  Limpar
                </Button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
