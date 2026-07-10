import { useState, useEffect } from "react";
import Card from "../../components/ui/Card/Card.jsx";
import Section from "../../components/ui/Section/Section.jsx";
import { testimonialsContent } from "../../content/siteContent.js";

export default function Testimonials() {
  const [googleData, setGoogleData] = useState({ rating: null, total: null });

  useEffect(() => {
    async function fetchGoogleRating() {
      try {
        const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
        const placeId = import.meta.env.VITE_GOOGLE_PLACE_ID;

        if (!apiKey || !placeId) return;

        const response = await fetch(
          `https://places.googleapis.com/v1/places/${placeId}?fields=rating,userRatingCount&key=${apiKey}`
        );
        const data = await response.json();

        if (data && data.rating) {
          setGoogleData({
            rating: data.rating,
            total: data.userRatingCount,
          });
        }
      } catch (error) {
        console.error("Erro ao buscar nota do Google:", error);
      }
    }

    fetchGoogleRating();
  }, []);

  return (
    <Section
      className="surface-band"
      data-od-id="depoimentos"
      aria-labelledby="sec-depoimentos"
      containerClassName="container stack"
      containerStyle={{ gap: "var(--space-12)" }}
    >
      <div style={{ maxWidth: 680 }}>
        <p className="eyebrow">{testimonialsContent.eyebrow}</p>
        <h2 id="sec-depoimentos">{testimonialsContent.title}</h2>

      </div>
      <div className="grid-3">
        {testimonialsContent.reviews.map((review) => (
          <Card key={review.author} itemScope itemType="https://schema.org/Review">
            <span itemProp="itemReviewed" itemScope itemType="https://schema.org/Person">
              <meta itemProp="name" content="Robson Svicero - UX/UI Designer e Desenvolvedor" />
            </span>
            <span itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
              <meta itemProp="ratingValue" content="5" />
              <meta itemProp="bestRating" content="5" />
            </span>
            <blockquote className="quote" itemProp="reviewBody">
              "{review.quote}"
            </blockquote>
            <p className="quote-author" itemProp="author" itemScope itemType="https://schema.org/Person">
              <span itemProp="name">{review.author}</span>
            </p>
          </Card>
        ))}

        {googleData.rating && (
          <div className="google-rating-badge" style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginTop: "16px", padding: "8px 16px", backgroundColor: "#fff", borderRadius: "100px", border: "1px solid var(--border-soft)", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
            </svg>
            <span style={{ fontWeight: "600", color: "var(--fg)" }}>{googleData.rating}</span>
            <span style={{ display: "flex", color: "#FFB300", fontSize: "14px", letterSpacing: "1px" }}>★★★★★</span>
            <span style={{ fontSize: "14px", color: "var(--muted)", marginLeft: "4px" }}>({googleData.total} avaliações)</span>
          </div>
        )}
      </div>
    </Section>
  );
}
