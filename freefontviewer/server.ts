import { serve } from "bun";
import { existsSync } from "node:fs";

// --- 1. Font Database Logic (Ported from Python) ---
const DB_PATH = "fonts.json";

function generateFontDb() {
  console.log("Generating font database...");
  const googleFonts = [
    "Roboto", "Open Sans", "Lato", "Montserrat", "Oswald", "Source Sans Pro",
    "Slabo 27px", "Raleway", "PT Sans", "Merriweather", "Noto Sans", "Nunito",
    "Prompt", "Work Sans", "Rubik", "Poppins", "Fira Sans", "Quicksand", "Barlow",
    "Inter", "Playfair Display", "Lora", "Ubuntu", "Kanit", "Mukta", "Bitter",
    "Crimson Text", "Josefin Sans", "Libre Baskerville", "Anton", "Cabin", "Arvo",
    "Pacifico", "Dancing Script", "Shadows Into Light", "Abril Fatface", "Bangers",
    "Lobster", "Righteous", "Fredoka One", "Permanent Marker", "Alfa Slab One"
  ];
  const fontshareFonts = [
    "Satoshi", "General Sans", "Clash Display", "Cabinet Grotesk", "Ranade",
    "Excon", "Stardom", "Telma", "Khand", "Erode", "Sentient", "Zodiak"
  ];
  const safeFonts = ["Arial", "Helvetica", "Georgia", "Times New Roman", "Courier New", "Verdana"];
  const categories = ["sans-serif", "serif", "display", "handwriting", "monospace"];

  const createEntry = (name: string, provider: string, cat?: string) => ({
    id: `${provider.toLowerCase()}-${name.toLowerCase().replace(/\s+/g, '-')}`,
    name,
    provider,
    category: cat || categories[Math.floor(Math.random() * categories.length)],
    variants: ["300", "400", "500", "700", "300i", "400i"],
    variable: provider !== "System" ? Math.random() < 0.5 : false,
    popularity: Math.floor(Math.random() * (100 - 50 + 1) + 50)
  });

  const db: any[] = [];
  
  googleFonts.forEach(f => {
    let cat = "sans-serif";
    if (["Playfair Display", "Merriweather", "Lora", "Libre Baskerville", "Crimson Text", "Bitter"].includes(f)) cat = "serif";
    if (["Pacifico", "Dancing Script", "Shadows Into Light", "Permanent Marker"].includes(f)) cat = "handwriting";
    if (["Lobster", "Abril Fatface", "Alfa Slab One", "Bangers", "Righteous"].includes(f)) cat = "display";
    if (f.includes("Mono") || f.includes("Code")) cat = "monospace";
    db.push(createEntry(f, "Google", cat));
  });

  fontshareFonts.forEach(f => {
    const cat = (f.includes("Sans") || f.includes("Grotesk")) ? "sans-serif" : "display";
    db.push(createEntry(f, "Fontshare", cat));
  });

  safeFonts.forEach(f => {
    const cat = ["Arial", "Helvetica", "Verdana"].includes(f) ? "sans-serif" : "serif";
    db.push(createEntry(f, "System", cat));
  });

  return db;
}

async function getFonts() {
  if (existsSync(DB_PATH)) return Bun.file(DB_PATH).json();
  const data = generateFontDb();
  await Bun.write(DB_PATH, JSON.stringify(data));
  return data;
}

// --- 2. Build Frontend ---
console.log("Building React App...");
const buildResult = await Bun.build({
  entrypoints: ["./src/App.tsx"],
  outdir: "./dist",
  minify: true,
});

if (!buildResult.success) {
  console.error("Build failed!", buildResult.logs);
} else {
  console.log("Build success!");
}

// --- 3. Server ---
serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);

    // API
    if (url.pathname === "/api/fonts") {
      const fonts = await getFonts();
      return Response.json(fonts);
    }

    // Static Assets (Build Output)
    if (url.pathname === "/app.js") {
      return new Response(Bun.file("./dist/App.js"), { headers: { "Content-Type": "application/javascript" }});
    }

    // Serve Index for root
    if (url.pathname === "/") {
      return new Response(Bun.file("./src/index.html"), { headers: { "Content-Type": "text/html" }});
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log("Server running on http://localhost:3000");