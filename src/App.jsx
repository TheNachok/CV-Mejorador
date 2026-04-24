import { useState, useRef } from “react”;

const ACCENT = “#C8FF00”;
const BG = “#0A0A0A”;
const SURFACE = “#111111”;
const BORDER = “#222222”;

const styles = {
root: {
minHeight: “100vh”,
background: BG,
color: “#E8E8E8”,
fontFamily: “‘DM Mono’, ‘Courier New’, monospace”,
padding: “0”,
margin: “0”,
},
header: {
borderBottom: `1px solid ${BORDER}`,
padding: “28px 40px”,
display: “flex”,
alignItems: “center”,
justifyContent: “space-between”,
background: “#0D0D0D”,
},
logo: {
fontSize: “20px”,
fontWeight: “700”,
letterSpacing: “0.08em”,
color: ACCENT,
fontFamily: “‘DM Mono’, monospace”,
},
badge: {
fontSize: “11px”,
color: “#555”,
letterSpacing: “0.15em”,
textTransform: “uppercase”,
},
main: {
maxWidth: “900px”,
margin: “0 auto”,
padding: “60px 40px”,
},
hero: {
marginBottom: “56px”,
},
heroTitle: {
fontSize: “clamp(36px, 5vw, 56px)”,
fontWeight: “800”,
lineHeight: “1.05”,
letterSpacing: “-0.02em”,
fontFamily: “‘DM Sans’, ‘Helvetica Neue’, sans-serif”,
color: “#F5F5F5”,
marginBottom: “16px”,
},
heroAccent: {
color: ACCENT,
},
heroSub: {
fontSize: “16px”,
color: “#666”,
lineHeight: “1.6”,
maxWidth: “520px”,
},
card: {
background: SURFACE,
border: `1px solid ${BORDER}`,
borderRadius: “4px”,
padding: “32px”,
marginBottom: “24px”,
},
label: {
fontSize: “11px”,
letterSpacing: “0.15em”,
textTransform: “uppercase”,
color: “#555”,
marginBottom: “12px”,
display: “block”,
},
textarea: {
width: “100%”,
minHeight: “220px”,
background: “#0A0A0A”,
border: `1px solid ${BORDER}`,
borderRadius: “2px”,
color: “#E8E8E8”,
fontFamily: “‘DM Mono’, ‘Courier New’, monospace”,
fontSize: “13px”,
lineHeight: “1.7”,
padding: “16px”,
resize: “vertical”,
outline: “none”,
boxSizing: “border-box”,
transition: “border-color 0.2s”,
},
selectRow: {
display: “flex”,
gap: “12px”,
marginBottom: “24px”,
flexWrap: “wrap”,
},
chip: {
padding: “8px 18px”,
borderRadius: “2px”,
fontSize: “12px”,
letterSpacing: “0.08em”,
cursor: “pointer”,
border: `1px solid ${BORDER}`,
background: “transparent”,
color: “#666”,
transition: “all 0.15s”,
fontFamily: “‘DM Mono’, monospace”,
},
chipActive: {
background: ACCENT,
color: “#000”,
border: `1px solid ${ACCENT}`,
fontWeight: “700”,
},
btn: {
background: ACCENT,
color: “#000”,
border: “none”,
borderRadius: “2px”,
padding: “14px 32px”,
fontSize: “13px”,
fontWeight: “700”,
letterSpacing: “0.1em”,
textTransform: “uppercase”,
cursor: “pointer”,
fontFamily: “‘DM Mono’, monospace”,
transition: “opacity 0.15s, transform 0.1s”,
display: “inline-flex”,
alignItems: “center”,
gap: “10px”,
},
btnDisabled: {
opacity: 0.4,
cursor: “not-allowed”,
},
btnSecondary: {
background: “transparent”,
color: “#888”,
border: `1px solid ${BORDER}`,
borderRadius: “2px”,
padding: “10px 20px”,
fontSize: “12px”,
cursor: “pointer”,
fontFamily: “‘DM Mono’, monospace”,
letterSpacing: “0.08em”,
transition: “all 0.15s”,
},
loading: {
display: “flex”,
alignItems: “center”,
gap: “14px”,
color: “#555”,
fontSize: “13px”,
padding: “24px 0”,
},
dot: {
width: “6px”,
height: “6px”,
borderRadius: “50%”,
background: ACCENT,
animation: “pulse 1.2s ease-in-out infinite”,
},
resultBox: {
background: “#0A0A0A”,
border: `1px solid ${BORDER}`,
borderRadius: “2px”,
padding: “24px”,
fontFamily: “‘DM Mono’, ‘Courier New’, monospace”,
fontSize: “13px”,
lineHeight: “1.8”,
color: “#D0D0D0”,
whiteSpace: “pre-wrap”,
wordBreak: “break-word”,
maxHeight: “520px”,
overflowY: “auto”,
},
tag: {
display: “inline-block”,
background: “#1A1A1A”,
border: `1px solid #2A2A2A`,
borderRadius: “2px”,
padding: “3px 10px”,
fontSize: “11px”,
color: “#555”,
marginRight: “8px”,
letterSpacing: “0.1em”,
},
divider: {
border: “none”,
borderTop: `1px solid ${BORDER}`,
margin: “28px 0”,
},
copyRow: {
display: “flex”,
gap: “10px”,
marginTop: “20px”,
alignItems: “center”,
},
copied: {
fontSize: “12px”,
color: ACCENT,
letterSpacing: “0.1em”,
},
sectionTitle: {
fontSize: “13px”,
color: “#888”,
letterSpacing: “0.12em”,
textTransform: “uppercase”,
marginBottom: “20px”,
},
errorBox: {
background: “#1A0A0A”,
border: “1px solid #3A1A1A”,
borderRadius: “2px”,
padding: “16px 20px”,
color: “#FF6B6B”,
fontSize: “13px”,
marginTop: “16px”,
}
};

const TARGETS = [“Ingeniería”, “Administración”, “Marketing”, “Derecho”, “Finanzas”, “Tecnología”, “Ventas”, “Otro”];
const TONES = [“Formal”, “Moderno”, “Ejecutivo”];

const SYSTEM_PROMPT = `Eres un experto en redacción de CVs profesionales para el mercado laboral chileno y latinoamericano.
Tu tarea es tomar el CV en texto que te envíen y mejorarlo completamente.

Debes:

1. Reescribir el resumen/perfil profesional con lenguaje de alto impacto
1. Mejorar las descripciones de experiencia con verbos de acción y métricas cuando sea posible
1. Optimizar las habilidades para que sean más relevantes y mejor presentadas
1. Corregir ortografía, puntuación y gramática
1. Adaptar el tono según el área solicitada
1. Añadir secciones que falten si son relevantes

Formato de respuesta:

- Usa el mismo idioma del CV original (español)
- Estructura claramente con secciones en MAYÚSCULAS
- Usa guiones (—) para bullet points, no asteriscos
- Sé conciso pero impactante
- Al final, añade una sección “NOTAS DEL EDITOR” con 3-4 sugerencias específicas de mejora adicional

NO inventes información que no esté en el CV original. Solo mejora lo que ya existe.`;

export default function CVMejorador() {
const [cvText, setCvText] = useState(””);
const [targetArea, setTargetArea] = useState(“Tecnología”);
const [tone, setTone] = useState(“Moderno”);
const [result, setResult] = useState(””);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(””);
const [copied, setCopied] = useState(false);
const [step, setStep] = useState(“input”); // input | result
const dotRefs = [useRef(), useRef(), useRef()];

const handleImprove = async () => {
if (!cvText.trim() || cvText.trim().length < 50) {
setError(“Por favor ingresa el contenido del CV (mínimo 50 caracteres).”);
return;
}
setError(””);
setLoading(true);
setResult(””);
setStep(“result”);

```
const userMsg = `Área objetivo: ${targetArea}
```

Tono deseado: ${tone}

CV A MEJORAR:
${cvText}`;

```
try {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMsg }],
    }),
  });

  const data = await response.json();

  if (data.error) {
    setError(`Error de API: ${data.error.message}`);
    setLoading(false);
    return;
  }

  const text = data.content?.map(b => b.text || "").join("") || "";
  setResult(text);
} catch (err) {
  setError("Error de conexión. Intenta nuevamente.");
}
setLoading(false);
```

};

const handleCopy = () => {
navigator.clipboard.writeText(result);
setCopied(true);
setTimeout(() => setCopied(false), 2000);
};

const handleReset = () => {
setStep(“input”);
setResult(””);
setError(””);
};

return (
<div style={styles.root}>
<style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;700;800&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; } textarea:focus { border-color: #333 !important; } button:hover:not(:disabled) { opacity: 0.85; } @keyframes blink { 0%, 80%, 100% { opacity: 0.15; } 40% { opacity: 1; } } .dot1 { animation: blink 1.4s ease-in-out 0s infinite; } .dot2 { animation: blink 1.4s ease-in-out 0.2s infinite; } .dot3 { animation: blink 1.4s ease-in-out 0.4s infinite; } ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #111; } ::-webkit-scrollbar-thumb { background: #333; }`}</style>

```
  <header style={styles.header}>
    <span style={styles.logo}>CV.AI</span>
    <span style={styles.badge}>Mejorador de CVs con IA</span>
  </header>

  <main style={styles.main}>
    {step === "input" && (
      <>
        <div style={styles.hero}>
          <h1 style={styles.heroTitle}>
            Tu CV,<br />
            <span style={styles.heroAccent}>reescrito</span> por IA.
          </h1>
          <p style={styles.heroSub}>
            Pega el texto de tu CV, elige el área y el tono, y obtendrás una versión mejorada lista para enviar.
          </p>
        </div>

        <div style={styles.card}>
          <span style={styles.label}>Pega el contenido del CV aquí</span>
          <textarea
            style={styles.textarea}
            value={cvText}
            onChange={e => setCvText(e.target.value)}
            placeholder={`Ej:\n\nNOMBRE: Juan Pérez\nEXPERIENCIA: Vendedor en Falabella 2 años...\nEDUCACIÓN: Ing. Comercial UC...\nHABILIDADES: Excel, comunicación...`}
            spellCheck={false}
          />
        </div>

        <div style={styles.card}>
          <span style={styles.label}>Área objetivo</span>
          <div style={styles.selectRow}>
            {TARGETS.map(t => (
              <button
                key={t}
                style={{ ...styles.chip, ...(targetArea === t ? styles.chipActive : {}) }}
                onClick={() => setTargetArea(t)}
              >
                {t}
              </button>
            ))}
          </div>

          <hr style={styles.divider} />

          <span style={styles.label}>Tono del CV</span>
          <div style={styles.selectRow}>
            {TONES.map(t => (
              <button
                key={t}
                style={{ ...styles.chip, ...(tone === t ? styles.chipActive : {}) }}
                onClick={() => setTone(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {error && <div style={styles.errorBox}>{error}</div>}

        <button
          style={{ ...styles.btn, ...(loading || !cvText.trim() ? styles.btnDisabled : {}) }}
          onClick={handleImprove}
          disabled={loading || !cvText.trim()}
        >
          <span>⚡</span> Mejorar CV ahora
        </button>
      </>
    )}

    {step === "result" && (
      <>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "36px" }}>
          <div>
            <h2 style={{ ...styles.heroTitle, fontSize: "32px", marginBottom: "8px" }}>
              {loading ? "Procesando..." : "CV Mejorado"}
            </h2>
            {!loading && (
              <div>
                <span style={styles.tag}>{targetArea}</span>
                <span style={styles.tag}>{tone}</span>
              </div>
            )}
          </div>
          {!loading && (
            <button style={styles.btnSecondary} onClick={handleReset}>
              ← Nuevo CV
            </button>
          )}
        </div>

        {loading && (
          <div style={styles.loading}>
            <div style={{ display: "flex", gap: "5px" }}>
              <div style={{ ...styles.dot }} className="dot1" />
              <div style={{ ...styles.dot }} className="dot2" />
              <div style={{ ...styles.dot }} className="dot3" />
            </div>
            <span>La IA está mejorando tu CV...</span>
          </div>
        )}

        {error && <div style={styles.errorBox}>{error}</div>}

        {result && (
          <>
            <div style={styles.card}>
              <p style={styles.sectionTitle}>Resultado</p>
              <div style={styles.resultBox}>{result}</div>
              <div style={styles.copyRow}>
                <button style={styles.btn} onClick={handleCopy}>
                  {copied ? "✓ Copiado" : "Copiar texto"}
                </button>
                {copied && <span style={styles.copied}>¡Listo!</span>}
              </div>
            </div>
          </>
        )}
      </>
    )}
  </main>
</div>

);
}
