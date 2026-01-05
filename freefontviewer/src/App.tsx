import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { createRoot } from 'react-dom/client';

// --- TYPES ---
type Font = {
    id: string;
    name: string;
    provider: 'Google' | 'Fontshare' | 'System';
    category: string;
    variants: string[];
    variable: boolean;
    popularity: number;
};

type Config = {
    fontSize: number;
    lineHeight: number;
    letterSpacing: number;
    fontWeight: number;
    italic: boolean;
    ligatures: boolean;
    stretch: number;
    width: number;
    color: string;
    bgColor: string;
};

// --- UTILS ---
const Utils = {
    Compress: {
        save: (key: string, data: any) => {
            try { localStorage.setItem(key, JSON.stringify(data)); } 
            catch (e) { console.warn("Storage full", e); }
        },
        load: (key: string, defaultVal: any) => {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : defaultVal;
            } catch { return defaultVal; }
        }
    },
    FontUrl: {
        google: (name: string) => `https://fonts.googleapis.com/css2?family=${name.replace(/\s+/g, '+')}:ital,wght@0,100..900;1,100..900&display=swap`,
        fontshare: (name: string) => `https://api.fontshare.com/v2/css?f[]=${name.replace(/\s+/g, '-').toLowerCase()}@100,200,300,400,500,600,700,800,900&display=swap`,
        generate: (font: Font) => {
            if (font.provider === 'Google') return Utils.FontUrl.google(font.name);
            if (font.provider === 'Fontshare') return Utils.FontUrl.fontshare(font.name);
            return null;
        }
    },
    generateCSS: (font: Font) => {
        return `/* CSS for ${font.name} */\n` +
               `@import url('${Utils.FontUrl.generate(font)}');\n\n` +
               `.font-${font.id} {\n` +
               `  font-family: '${font.name}', ${font.category};\n` +
               `}`;
    }
};

// --- HOOKS ---
const useFontLoader = (font: Font, shouldLoad: boolean) => {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        if (!font || !shouldLoad || loaded || font.provider === 'System') {
            if (font?.provider === 'System') setLoaded(true);
            return;
        }
        const id = `font-css-${font.id}`;
        if (document.getElementById(id)) {
            setLoaded(true);
            return;
        }
        const url = Utils.FontUrl.generate(font);
        if (!url) return;
        const link = document.createElement('link');
        link.id = id;
        link.rel = 'stylesheet';
        link.href = url;
        link.onload = () => setLoaded(true);
        link.onerror = () => console.warn(`Failed to load ${font.name}`);
        document.head.appendChild(link);
    }, [font, shouldLoad, loaded]);
    return loaded;
};

const useOnScreen = (options: IntersectionObserverInit) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isIntersecting, setIntersecting] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setIntersecting(true);
        }, options);
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [options]);
    return [ref, isIntersecting] as const;
};

const useStickyState = <T,>(defaultValue: T, key: string) => {
    const [value, setValue] = useState<T>(() => Utils.Compress.load(key, defaultValue));
    useEffect(() => { Utils.Compress.save(key, value); }, [key, value]);
    return [value, setValue] as const;
};

// --- UI COMPONENTS ---
const Button = ({ icon, label, onClick, variant = 'secondary', active, className = '' }: any) => {
    const base = "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 active:scale-95";
    const variants: any = {
        primary: "bg-primary-600 text-white hover:bg-primary-700 shadow-sm",
        secondary: "bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-800 hover:bg-gray-50 dark:hover:bg-dark-700 text-gray-700 dark:text-gray-200",
        ghost: "hover:bg-gray-100 dark:hover:bg-dark-800 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
    };
    return (
        <button onClick={onClick} className={`${base} ${variants[variant]} ${active ? "ring-2 ring-primary-500 bg-primary-50 dark:bg-dark-800 text-primary-600" : ""} ${className}`}>
            {icon && <i className={`ph ${icon} text-lg`}></i>}
            {label && <span>{label}</span>}
        </button>
    );
};

const Slider = ({ label, value, min, max, onChange, unit = '' }: any) => (
    <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between text-xs uppercase font-bold text-gray-500 dark:text-gray-400 tracking-wider">
            <span>{label}</span><span>{value}{unit}</span>
        </div>
        <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} className="range-slider"/>
    </div>
);

const Toggle = ({ label, checked, onChange }: any) => (
    <label className="flex items-center justify-between cursor-pointer group">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-500 transition-colors">{label}</span>
        <div className="relative inline-block w-10 h-6 align-middle select-none transition duration-200 ease-in">
            <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300 dark:border-gray-600 top-1 left-1 transition-all duration-300 checked:left-5 checked:border-primary-500"/>
            <span className={`toggle-label block overflow-hidden h-6 rounded-full bg-gray-200 dark:bg-dark-800 cursor-pointer transition-colors ${checked ? 'bg-primary-200 dark:bg-primary-900' : ''}`}></span>
        </div>
    </label>
);

const ColorPicker = ({ value, onChange }: any) => (
    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:scale-110 transition-transform">
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="absolute -top-2 -left-2 w-12 h-12 p-0 border-0 cursor-pointer opacity-0" />
        <div className="w-full h-full" style={{ backgroundColor: value }}></div>
    </div>
);

// --- FEATURE COMPONENTS ---

const Toolbar = ({ search, setSearch, previewText, setPreviewText, config, setConfig, viewMode, setViewMode, resetConfig, totalFonts, visibleFonts }: any) => {
    const [showFilters, setShowFilters] = useState(false);
    const update = (key: string, val: any) => setConfig((prev: any) => ({ ...prev, [key]: val }));

    return (
        <div className="sticky top-0 z-40 bg-white/90 dark:bg-dark-900/90 backdrop-blur-md border-b border-gray-200 dark:border-dark-700 shadow-sm transition-all">
            <div className="flex flex-col gap-4 p-4 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-1 w-full">
                        <i className="ph ph-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        <input type="text" placeholder={`Search ${totalFonts} fonts...`} value={search} onChange={e => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-dark-700 bg-gray-50 dark:bg-dark-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 outline-none transition-all"/>
                    </div>
                    <input type="text" placeholder="Type something to preview..." value={previewText} onChange={e => setPreviewText(e.target.value)}
                        className="flex-[2] w-full px-4 py-2.5 rounded-xl border border-transparent hover:border-gray-200 dark:hover:border-dark-700 bg-transparent text-lg font-medium text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:bg-white dark:focus:bg-dark-800 focus:border-primary-500 outline-none transition-all"/>
                     <div className="flex items-center gap-2 shrink-0">
                        <Button icon="ph-sliders-horizontal" label="Filters" active={showFilters} onClick={() => setShowFilters(!showFilters)} />
                        <div className="h-6 w-px bg-gray-200 dark:bg-dark-700 mx-1"></div>
                        <Button icon="ph-squares-four" active={viewMode === 'grid'} onClick={() => setViewMode('grid')} />
                        <Button icon="ph-list" active={viewMode === 'list'} onClick={() => setViewMode('list')} />
                    </div>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showFilters ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4 bg-gray-50 dark:bg-dark-800/50 rounded-xl border border-gray-100 dark:border-dark-700">
                        <div className="space-y-4">
                            <Slider label="Size" min={12} max={120} value={config.fontSize} onChange={(v:any) => update('fontSize', v)} unit="px" />
                            <Slider label="Weight" min={100} max={900} value={config.fontWeight} onChange={(v:any) => update('fontWeight', v)} />
                        </div>
                        <div className="space-y-4">
                            <Slider label="Letter Spacing" min={-5} max={10} value={config.letterSpacing} onChange={(v:any) => update('letterSpacing', v)} unit="px" />
                            <Slider label="Line Height" min={0.8} max={2.5} value={config.lineHeight} onChange={(v:any) => update('lineHeight', v)} />
                        </div>
                         <div className="space-y-3">
                            <Toggle label="Italic" checked={config.italic} onChange={(v:any) => update('italic', v)} />
                            <Toggle label="Ligatures" checked={config.ligatures} onChange={(v:any) => update('ligatures', v)} />
                            <div className="flex items-center justify-between"><span className="text-xs uppercase font-bold text-gray-500">Colors</span><div className="flex gap-2"><ColorPicker value={config.color} onChange={(v:any) => update('color', v)} /><ColorPicker value={config.bgColor} onChange={(v:any) => update('bgColor', v)} /></div></div>
                         </div>
                         <div className="flex flex-col gap-2 justify-center border-l border-gray-200 dark:border-dark-700 pl-6">
                            <Button label="Reset Defaults" icon="ph-arrow-counter-clockwise" onClick={resetConfig} />
                            <div className="text-center text-xs text-gray-400 mt-2">Showing {visibleFonts} of {totalFonts}</div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FontCard = React.memo(({ font, text, config, isFav, onToggleFav, onSelect, isSelected, onInspect }: any) => {
    const [ref, isVisible] = useOnScreen({ rootMargin: '200px' });
    const loaded = useFontLoader(font, isVisible);

    const cardStyle: React.CSSProperties = {
        fontFamily: loaded || font.provider === 'System' ? `"${font.name}", ${font.category}` : 'sans-serif',
        fontSize: `${config.fontSize}px`,
        lineHeight: config.lineHeight,
        letterSpacing: `${config.letterSpacing}px`,
        fontWeight: config.fontWeight,
        fontStyle: config.italic ? 'italic' : 'normal',
        transform: `scaleY(${1 + config.stretch}) scaleX(${1 + config.width})`,
        color: config.color,
        fontVariantLigatures: config.ligatures ? 'normal' : 'none',
    };

    const providerColors: any = {
        Google: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
        Fontshare: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
        System: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
    };

    return (
        <div ref={ref} className={`group relative flex flex-col rounded-xl border transition-all duration-300 hover:shadow-xl bg-white dark:bg-dark-800 ${isSelected ? 'border-primary-500 ring-2 ring-primary-500/20' : 'border-gray-200 dark:border-dark-700'}`}>
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-dark-700">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-900 dark:text-white truncate max-w-[150px]">{font.name}</h3>
                        <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${providerColors[font.provider]}`}>{font.provider}</span>
                    </div>
                    <p className="text-xs text-gray-500 capitalize">{font.category} • {font.variants.length} styles</p>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                     <Button icon={isFav ? "ph-heart-fill text-red-500" : "ph-heart"} variant="ghost" className={isFav ? "text-red-500" : ""} onClick={() => onToggleFav(font)} />
                    <Button icon="ph-list-plus" variant="ghost" active={isSelected} onClick={() => onSelect(font)} />
                    <Button icon="ph-info" variant="ghost" onClick={() => onInspect(font)} />
                </div>
            </div>
            <div className="flex-1 p-6 overflow-hidden min-h-[180px] flex items-center" style={{ backgroundColor: config.bgColor }}>
                {loaded || font.provider === 'System' ? (
                    <div contentEditable suppressContentEditableWarning className="w-full outline-none break-words" style={cardStyle}>
                        {text || "The quick brown fox jumps over the lazy dog."}
                    </div>
                ) : (
                    <div className="w-full flex justify-center text-gray-300 animate-pulse">Loading {font.name}...</div>
                )}
            </div>
        </div>
    );
});

const PairingLab = ({ isOpen, onClose, fonts, selectedFonts }: any) => {
    if (!isOpen) return null;
    const [headerFont, setHeaderFont] = useState(selectedFonts[0] || fonts[0]);
    const [bodyFont, setBodyFont] = useState(selectedFonts[1] || fonts[1] || fonts[0]);
    useFontLoader(headerFont, true);
    useFontLoader(bodyFont, true);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-5xl h-[80vh] bg-white dark:bg-dark-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-dark-700">
                <div className="flex justify-between items-center p-4 border-b dark:border-dark-800">
                    <h2 className="text-xl font-bold flex items-center gap-2"><i className="ph-duotone ph-circles-three-plus text-primary-500"></i> Font Pairing Lab</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-full"><i className="ph ph-x text-lg"></i></button>
                </div>
                <div className="flex flex-1 overflow-hidden">
                    <div className="w-72 bg-gray-50 dark:bg-dark-950 p-6 border-r dark:border-dark-800 flex flex-col gap-6 overflow-y-auto">
                        <div><label className="block text-xs font-bold uppercase text-gray-500 mb-2">Heading Font</label><select className="w-full p-2 rounded border bg-white dark:bg-dark-900 dark:border-dark-700" value={headerFont.name} onChange={(e) => setHeaderFont(fonts.find((f:any) => f.name === e.target.value))}>{fonts.map((f:any) => <option key={f.name} value={f.name}>{f.name}</option>)}</select></div>
                        <div><label className="block text-xs font-bold uppercase text-gray-500 mb-2">Body Font</label><select className="w-full p-2 rounded border bg-white dark:bg-dark-900 dark:border-dark-700" value={bodyFont.name} onChange={(e) => setBodyFont(fonts.find((f:any) => f.name === e.target.value))}>{fonts.map((f:any) => <option key={f.name} value={f.name}>{f.name}</option>)}</select></div>
                    </div>
                    <div className="flex-1 p-12 overflow-y-auto bg-white dark:bg-dark-900">
                        <div className="max-w-2xl mx-auto space-y-6">
                            <h1 style={{ fontFamily: headerFont.name }} className="text-6xl font-bold text-gray-900 dark:text-gray-50 leading-tight">The spectacle before us was indeed sublime.</h1>
                            <div style={{ fontFamily: bodyFont.name }} className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 space-y-4">
                                <p>Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed.</p>
                                <p>The term typography is also applied to the style, arrangement, and appearance of the letters, numbers, and symbols created by the process.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ExportModal = ({ isOpen, onClose, font }: any) => {
    if (!isOpen || !font) return null;
    const cssCode = Utils.generateCSS(font);
    const copyToClipboard = () => { navigator.clipboard.writeText(cssCode); alert("Copied to clipboard!"); };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-lg bg-white dark:bg-dark-900 rounded-xl shadow-xl border border-gray-200 dark:border-dark-700 p-6">
                <div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">Use {font.name}</h3><button onClick={onClose}><i className="ph ph-x"></i></button></div>
                <div className="space-y-4">
                    <div><label className="block text-xs font-bold uppercase text-gray-500 mb-1">CSS Import</label><div className="relative"><pre className="bg-gray-100 dark:bg-dark-950 p-4 rounded-lg text-xs overflow-x-auto font-mono text-gray-700 dark:text-gray-300">{cssCode}</pre><button onClick={copyToClipboard} className="absolute top-2 right-2 p-2 bg-white dark:bg-dark-800 rounded shadow hover:bg-gray-50"><i className="ph ph-copy"></i></button></div></div>
                    <div className="flex gap-2">
                        <a href={Utils.FontUrl.generate(font) || '#'} target="_blank" className="flex-1 text-center py-2 rounded-lg border border-gray-300 dark:border-dark-700 hover:bg-gray-50 dark:hover:bg-dark-800 text-sm font-medium"><i className="ph ph-link mr-2"></i> Open CSS</a>
                        {font.provider === 'Google' && (<a href={`https://fonts.google.com/specimen/${font.name.replace(/\s+/g, '+')}`} target="_blank" className="flex-1 text-center py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 text-sm font-medium">Download from Google</a>)}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- MAIN APP ---
const DEFAULT_CONFIG: Config = {
    fontSize: 32, lineHeight: 1.5, letterSpacing: 0, fontWeight: 400,
    italic: false, ligatures: true, stretch: 0, width: 0,
    color: '#1e293b', bgColor: '#ffffff'
};

const App = () => {
    const [fonts, setFonts] = useState<Font[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [previewText, setPreviewText] = useStickyState("The quick brown fox jumps over the lazy dog.", "typeos_preview");
    const [favorites, setFavorites] = useStickyState<Font[]>([], "typeos_favs");
    const [config, setConfig] = useStickyState(DEFAULT_CONFIG, "typeos_config");
    const [viewMode, setViewMode] = useState<'grid'|'list'>('grid');
    const [selection, setSelection] = useState<Font[]>([]);
    const [pairingOpen, setPairingOpen] = useState(false);
    const [exportData, setExportData] = useState<Font | null>(null);

    useEffect(() => {
        fetch('/api/fonts')
            .then(res => res.json())
            .then(data => { setFonts(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const filteredFonts = useMemo(() => {
        if (!search) return fonts;
        const lower = search.toLowerCase();
        return fonts.filter(f => f.name.toLowerCase().includes(lower) || f.category.toLowerCase().includes(lower) || f.provider.toLowerCase().includes(lower));
    }, [fonts, search]);

    const toggleFav = useCallback((font: Font) => {
        setFavorites(prev => {
            const exists = prev.find(f => f.name === font.name);
            return exists ? prev.filter(f => f.name !== font.name) : [...prev, font];
        });
    }, [setFavorites]);

    const toggleSelect = useCallback((font: Font) => {
        setSelection(prev => {
            const exists = prev.find(f => f.name === font.name);
            if (exists) return prev.filter(f => f.name !== font.name);
            if (prev.length >= 2) return [prev[1], font];
            return [...prev, font];
        });
    }, []);

    if (loading) return <div className="h-screen flex items-center justify-center flex-col gap-4 bg-gray-50 dark:bg-dark-950"><i className="ph ph-spinner animate-spin text-4xl text-primary-500"></i><p className="text-gray-500 font-mono text-sm">Initializing TypeOS Engine...</p></div>;

    return (
        <div className={`min-h-screen flex flex-col ${config.bgColor !== '#ffffff' ? '' : 'bg-gray-50 dark:bg-dark-950'}`}>
            <Toolbar search={search} setSearch={setSearch} previewText={previewText} setPreviewText={setPreviewText} config={config} setConfig={setConfig} viewMode={viewMode} setViewMode={setViewMode} resetConfig={() => setConfig(DEFAULT_CONFIG)} totalFonts={fonts.length} visibleFonts={filteredFonts.length} />
            
            <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                <div className={`grid gap-6 max-w-7xl mx-auto ${viewMode === 'list' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}>
                    {filteredFonts.slice(0, 100).map(font => (
                        <FontCard key={font.id} font={font} text={previewText} config={config} isFav={favorites.some(f => f.name === font.name)} onToggleFav={toggleFav} isSelected={selection.some(f => f.name === font.name)} onSelect={toggleSelect} onInspect={setExportData} />
                    ))}
                </div>
            </main>

            {selection.length > 0 && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-dark-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-4 animate-fade-in z-50">
                    <span className="font-bold text-sm">{selection.length} Selected</span><div className="h-4 w-px bg-gray-700"></div>
                    <button onClick={() => setPairingOpen(true)} className="text-sm font-medium hover:text-primary-400 flex items-center gap-2"><i className="ph-duotone ph-circles-three-plus"></i> Compare</button>
                    <button onClick={() => setSelection([])} className="ml-2 text-gray-400 hover:text-white"><i className="ph ph-x"></i></button>
                </div>
            )}
            <PairingLab isOpen={pairingOpen} onClose={() => setPairingOpen(false)} fonts={fonts} selectedFonts={selection} />
            <ExportModal isOpen={!!exportData} onClose={() => setExportData(null)} font={exportData} />
        </div>
    );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);