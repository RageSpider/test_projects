/* ===============================================================
  PART 3: THE DESIGN PART (designs.js)
  
  V2.0 UPDATE:
  - Added new component 'content-type-scale' to 'contentSections2'.
  - This new component is perfect for at-a-glance hierarchy testing.
  ===============================================================
*/

export const componentLibrary = {
    // === 1. Navbars (10 Variants + None) ===
    navbars: {
        'none': { name: '-- None --', html: '' },
        'nav-simple': {
            name: 'Navbar: Simple',
            html: `
                <nav class="bg-white p-4 rounded-lg shadow-lg border border-gray-200 flex justify-between items-center mb-8">
                    <h3 class="!text-2xl !mb-0">LogoHere</h3>
                    <ul class="flex gap-6 body-text !mb-0">
                        <li><a href="#" class="font-semibold text-gray-700">Home</a></li>
                        <li><a href="#" class="text-gray-500">Features</a></li>
                        <li><a href="#" class="text-gray-500">Pricing</a></li>
                    </ul>
                    <button class="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg text-sm">Sign Up</button>
                </nav>
            `
        },
        'nav-centered': {
            name: 'Navbar: Centered',
            html: `
                <nav class="bg-white p-4 rounded-lg shadow-lg border border-gray-200 text-center mb-8">
                    <h3 class="!text-2xl !mb-2">LogoHere</h3>
                    <ul class="flex gap-6 justify-center body-text !mb-0">
                        <li><a href="#" class="font-semibold text-gray-700">Home</a></li>
                        <li><a href="#" class="text-gray-500">About</a></li>
                        <li><a href="#" class="text-gray-500">Gallery</a></li>
                        <li><a href="#" class="text-gray-500">Contact</a></li>
                    </ul>
                </nav>
            `
        },
        'nav-dark': {
            name: 'Navbar: Dark',
            html: `
                <nav class="bg-gray-800 text-white p-4 rounded-lg shadow-lg mb-8 flex justify-between items-center">
                    <h3 class="!text-2xl !mb-0 text-white">LogoHere</h3>
                    <ul class="flex gap-6 body-text !mb-0">
                        <li><a href="#" class="font-semibold text-white">Products</a></li>
                        <li><a href="#" class="text-gray-300">Company</a></li>
                        <li><a href="#" class="text-gray-300">Blog</a></li>
                    </ul>
                    <button class="bg-white text-gray-800 font-bold py-2 px-5 rounded-lg text-sm">Login</button>
                </nav>
            `
        },
        'nav-minimal': {
            name: 'Navbar: Minimal',
            html: `
                <nav class="p-4 rounded-lg mb-8 flex justify-between items-center">
                    <h3 class="!text-lg !mb-0">A. Designer</h3>
                    <ul class="flex gap-4 body-text !mb-0 !text-sm">
                        <li><a href="#" class="text-gray-500">Work</a></li>
                        <li><a href="#" class="text-gray-500">About</a></li>
                    </ul>
                    <button class="text-gray-800 font-bold py-2 px-5 rounded-lg text-sm border border-gray-300">Contact</button>
                </nav>
            `
        },
        'nav-search': {
            name: 'Navbar: With Search',
            html: `
                <nav class="bg-white p-4 rounded-lg shadow-lg border border-gray-200 flex justify-between items-center mb-8 gap-8">
                    <h3 class="!text-2xl !mb-0">Docs</h3>
                    <div class="flex-grow"><input type="text" class="w-full p-2 border border-gray-300 rounded-md shadow-sm text-base" placeholder="Search documentation..."></div>
                    <ul class="flex gap-4 body-text !mb-0">
                        <li><a href="#" class="text-gray-500">API</a></li>
                        <li><a href="#" class="text-gray-500">Support</a></li>
                    </ul>
                </nav>
            `
        },
        'nav-split': {
            name: 'Navbar: Split',
            html: `
                <nav class="bg-white p-4 rounded-lg shadow-lg border border-gray-200 flex justify-between items-center mb-8">
                    <ul class="flex gap-6 body-text !mb-0">
                        <li><a href="#" class="font-semibold text-gray-700">Shop</a></li>
                        <li><a href="#" class="text-gray-500">About</a></li>
                    </ul>
                    <h3 class="!text-2xl !mb-0">LogoHere</h3>
                    <ul class="flex gap-6 body-text !mb-0">
                        <li><a href="#" class="text-gray-500">Login</a></li>
                        <li><a href="#" class="text-gray-500">Cart (0)</a></li>
                    </ul>
                </nav>
            `
        },
        'nav-app': {
            name: 'Navbar: App UI',
            html: `
                <nav class="bg-gray-50 p-3 rounded-lg border border-gray-200 flex justify-between items-center mb-8">
                    <div class="flex items-center gap-4">
                        <h3 class="!text-xl !mb-0">Dashboard</h3>
                        <span class="unimportant-body !mb-0">/</span>
                        <p class="body-text !mb-0 text-gray-800 font-medium">Overview</p>
                    </div>
                    <button class="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg text-sm">New Project</button>
                </nav>
            `
        },
        'nav-mega': {
            name: 'Navbar: Mega Menu (Simple)',
            html: `
                <nav class="bg-white p-4 rounded-lg shadow-lg border border-gray-200 flex justify-between items-center mb-8">
                    <h3 class="!text-2xl !mb-0">E-Commerce</h3>
                    <ul class="flex gap-8 body-text !mb-0">
                        <li><a href="#" class="font-semibold text-gray-700">Men</a></li>
                        <li><a href="#" class="text-gray-500">Women</a></li>
                        <li><a href="#" class="text-gray-500">Kids</a></li>
                        <li><a href="#" class="text-gray-500">Sale</a></li>
                    </ul>
                    <button class="text-gray-800 font-bold py-2 px-5 rounded-lg text-sm border border-gray-300">Account</button>
                </nav>
            `
        },
        'nav-brand-center': {
            name: 'Navbar: Brand Centered',
            html: `
                <nav class="bg-white p-4 rounded-lg shadow-lg border border-gray-200 text-center mb-8">
                    <h3 class="!text-3xl !mb-4">The Font Shop</h3>
                    <ul class="flex gap-6 justify-center body-text !mb-0 border-t border-b py-2">
                        <li><a href="#" class="font-semibold text-gray-700">Home</a></li>
                        <li><a href="#" class="text-gray-500">New</a></li>
                        <li><a href="#" class="text-gray-500">Apparel</a></li>
                        <li><a href="#" class="text-gray-500">About</a></li>
                    </ul>
                </nav>
            `
        },
        'nav-minimal-dark': {
            name: 'Navbar: Minimal Dark',
            html: `
                <nav class="p-4 rounded-lg mb-8 flex justify-between items-center bg-gray-800 text-white">
                    <h3 class="!text-lg !mb-0 text-white">A. Designer</h3>
                    <ul class="flex gap-4 body-text !mb-0 !text-sm">
                        <li><a href="#" class="text-gray-300">Work</a></li>
                        <li><a href="#" class="text-gray-300">About</a></li>
                    </ul>
                    <button class="text-white font-bold py-2 px-5 rounded-lg text-sm border border-gray-500">Contact</button>
                </nav>
            `
        },
    },

    // === 2. Heroes (10 Variants + None) ===
    'heroes': {
        'none': { name: '-- None --', html: '' },
        'hero-saas': {
            name: 'Hero: SaaS Center',
            html: `
                <section class="text-center bg-gray-100 p-12 md:p-20 mb-12 rounded-lg">
                    <h1>Build Software Faster</h1>
                    <h2>The Quick Brown Fox Jumps Over the Lazy Dog</h2>
                    <p class="body-text max-w-2xl mx-auto text-lg text-gray-700">Use this space to see how your selected font behaves in a hero section. Check the heading weights, line height, and overall presence.</p>
                    <div class="flex justify-center gap-4 mt-8">
                        <button class="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-all text-base">Primary Button</button>
                        <button class="bg-white text-gray-800 font-bold py-3 px-6 rounded-lg shadow-md border border-gray-300 hover:bg-gray-50 transition-all text-base">Secondary Button</button>
                    </div>
                </section>
            `
        },
        'hero-split': {
            name: 'Hero: Split Image',
            html: `
                <section class="grid md:grid-cols-2 gap-8 items-center bg-white p-12 rounded-lg shadow border border-gray-200 mb-12">
                    <div>
                        <span class="description-label accent-text">Our Newest Thing</span>
                        <h1 class="!text-5xl mt-2">A Better Way to Work</h1>
                        <p class="important-body !text-xl my-6">This is an important body paragraph. It should be easy to read and inviting.</p>
                        <button class="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md">Get Started Now</button>
                    </div>
                    <div><img src="https://placehold.co/600x400/a78bfa/white?text=Feature" alt="Placeholder" class="w-full rounded-lg shadow-md"></div>
                </section>
            `
        },
        'hero-creative': {
            name: 'Hero: Creative Portfolio',
            html: `
                <section class="text-center min-h-[50vh] flex flex-col items-center justify-center bg-white p-8 md:p-12 rounded-lg shadow-xl border border-gray-200 mb-12">
                    <h1 class="!text-8xl !font-black uppercase !leading-none">Massive</h1>
                    <h2 class="!text-7xl !font-thin uppercase !leading-none">Typography</h2>
                    <p class="important-body !text-2xl mt-8">Testing ultra-bold & ultra-light weights.</p>
                </section>
            `
        },
        'hero-app': {
            name: 'Hero: App Landing',
            html: `
                <section class="text-center p-12 md:p-20 mb-12">
                    <h1 class="!text-6xl">Your New Favorite App</h1>
                    <h2 class="!text-2xl text-gray-600 mt-4 mb-8">All your tasks, all in one place. Finally.</h2>
                    <p class="body-text max-w-xl mx-auto">A paragraph describing the app's main benefit. 0123456789.</p>
                    <div class="flex justify-center gap-4 mt-8">
                        <button class="bg-black text-white font-bold py-3 px-6 rounded-lg shadow-md text-base">Download for iOS</button>
                        <button class="bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg shadow-md border border-gray-300 text-base">Download for Android</button>
                    </div>
                </section>
            `
        },
        'hero-minimal': {
            name: 'Hero: Minimal',
            html: `
                <section class="text-center p-12 md:p-32 bg-white rounded-lg shadow-xl border border-gray-200 mb-12">
                    <h1 class="!text-7xl">Design.</h1>
                    <h1 class="!text-7xl !font-light">Build.</h1>
                    <h1 class="!text-7xl">Ship.</h1>
                    <p class="body-text max-w-md mx-auto text-xl text-gray-600 mt-8">A simple, elegant solution for modern web development.</p>
                </section>
            `
        },
        'hero-dark-image': {
            name: 'Hero: Dark w/ Image',
            html: `
                <section class="min-h-[60vh] flex items-center p-12 bg-gray-700 text-white rounded-lg mb-12" style="background-image: url('https://placehold.co/1200x600/6b7280/ffffff?text=Background'); background-size: cover; background-position: center;">
                    <div class="bg-black bg-opacity-50 p-8 rounded-md max-w-xl">
                        <span class="description-label accent-text !text-gray-300">Photography</span>
                        <h1 class="!text-5xl text-white mt-2">Portraits & Landscapes</h1>
                        <p class="important-body !text-xl my-6 text-gray-200">Testing text legibility over a dark or complex background image.</p>
                        <button class="bg-white text-gray-800 font-bold py-3 px-6 rounded-lg shadow-md">View Gallery</button>
                    </div>
                </section>
            `
        },
        'hero-product': {
            name: 'Hero: Product',
            html: `
                <section class="grid md:grid-cols-2 gap-12 items-center bg-white p-12 rounded-lg shadow border border-gray-200 mb-12">
                    <div><img src="https://placehold.co/600x600/34d399/white?text=Product" alt="Placeholder" class="w-full rounded-lg shadow-md"></div>
                    <div>
                        <span class="description-label accent-text">Men's Footwear</span>
                        <h1 class="!text-4xl !leading-snug">The "Vertex" All-Weather Trainer</h1>
                        <p class="!text-4xl font-bold text-blue-600 my-4">$149.99</p>
                        <p class="important-body">A short, compelling summary of the product. Built for comfort, designed for style.</p>
                        <button class="w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-all text-lg mt-4">Add to Cart</button>
                    </div>
                </section>
            `
        },
        'hero-login': {
            name: 'Hero: Login Card',
            html: `
                <section class="min-h-[50vh] flex items-center justify-center p-12 bg-gray-100 rounded-lg mb-12">
                    <div class="max-w-md w-full bg-white p-8 md:p-12 rounded-lg shadow-xl border border-gray-200">
                        <h1 class="!text-3xl text-center mb-6">Log In to Your Account</h1>
                        <form class="space-y-6">
                            <div><label for="email-l" class="description-label accent-text !text-sm !mb-2">Email Address</label><input type="email" id="email-l" class="w-full p-3 border border-gray-300 rounded-md shadow-sm text-base"></div>
                            <div><label for="pass-l" class="description-label accent-text !text-sm !mb-2">Password</label><input type="password" id="pass-l" class="w-full p-3 border border-gray-300 rounded-md shadow-sm text-base"></div>
                            <button class="w-full bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition-all text-lg">Log In</button>
                        </form>
                    </div>
                </section>
            `
        },
        'hero-title-only': {
            name: 'Hero: Title Only',
            html: `
                <section class="text-left bg-white p-12 rounded-lg shadow border border-gray-200 mb-12">
                    <span class="description-label accent-text">Documentation</span>
                    <h1 class="!text-6xl">Getting Started</h1>
                    <p class="unimportant-body !text-base mt-4">A simple page header for docs or blogs.</p>
                </section>
            `
        },
        'hero-video': {
            name: 'Hero: Video Placeholder',
            html: `
                <section class="text-center p-12 md:p-20 mb-12">
                    <h1 class="!text-5xl">Watch It in Action</h1>
                    <p class="body-text max-w-2xl mx-auto text-lg text-gray-700 my-6">See how our product can change your workflow in this 2-minute video.</p>
                    <div class="bg-gray-800 rounded-lg shadow-xl p-20 max-w-3xl mx-auto">
                        <p class="text-white body-text">[Video Placeholder 16:9]</p>
                    </div>
                </section>
            `
        },
    },

    // === 3. Content Sections 1 (10 Variants + None) ===
    'contentSections1': {
        'none': { name: '-- None --', html: '' },
        'content-features-grid': {
            name: 'Content: Features Grid',
            html: `
                <section class="max-w-5xl mx-auto mb-12">
                    <h3 class="text-center mb-10">Everything you need. Nothing you don't.</h3>
                    <div class="grid md:grid-cols-3 gap-8">
                        <div class="bg-white rounded-lg shadow-lg border border-gray-200 p-6"><h3 class="mb-2">Feature One</h3><p class="body-text mb-0">This is a standard body paragraph within a card. 0123456789.</p></div>
                        <div class="bg-white rounded-lg shadow-lg border border-gray-200 p-6"><h3 class="mb-2">Feature Two</h3><p class="important-body mb-0">This card uses the "important body" style for its text.</p></div>
                        <div class="bg-white rounded-lg shadow-lg border border-gray-200 p-6"><h3 class="mb-2">Feature Three</h3><p class="unimportant-body mb-0">This card features unimportant text, good for captions or fine print.</p></div>
                    </div>
                </section>
            `
        },
        'content-blog-snippet': {
            name: 'Content: Blog Snippet',
            html: `
                <article class="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-xl border border-gray-200 mb-12">
                    <span class="description-label accent-text">Category</span>
                    <h2 class="!text-3xl mt-2 mb-4">The Role of X-Height in Readability</h2>
                    <p class="long-yapping-desc">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                    <blockquote class="accent-text">
                        "The quick brown fox jumps over the lazy dog." This pangram is invaluable for testing as it contains every letter of the alphabet.
                    </blockquote>
                </article>
            `
        },
        'content-testimonials': {
            name: 'Content: Testimonials',
            html: `
                <section class="bg-gray-100 p-12 rounded-lg mb-12">
                    <h2 class="!text-3xl text-center mb-10">What Our Users Say</h2>
                    <div class="grid md:grid-cols-3 gap-8">
                        <div class="bg-white p-6 rounded-lg shadow border border-gray-200">
                            <blockquote class="!border-l-0 !p-0 !italic !mb-4 body-text accent-text">"This product is amazing! It changed my entire workflow."</blockquote>
                            <p class="unimportant-body !font-semibold !mb-0">Jane Doe, CEO at Example</p>
                        </div>
                        <div class="bg-white p-6 rounded-lg shadow border border-gray-200">
                            <blockquote class="!border-l-0 !p-0 !italic !mb-4 body-text accent-text">"I don't know how I lived without this. A must-have for any team."</blockquote>
                            <p class="unimportant-body !font-semibold !mb-0">John Smith, Developer</p>
                        </div>
                        <div class="bg-white p-6 rounded-lg shadow border border-gray-200">
                            <blockquote class="!border-l-0 !p-0 !italic !mb-4 body-text accent-text">"The quick brown fox jumps over the lazy dog. 10/10."</blockquote>
                            <p class="unimportant-body !font-semibold !mb-0">A. Typographer</p>
                        </div>
                    </div>
                </section>
            `
        },
        'content-cta-banner': {
            name: 'Content: CTA Banner',
            html: `
                <section class="bg-blue-600 text-white p-12 rounded-lg shadow-lg grid md:grid-cols-3 items-center mb-12">
                    <div class="md:col-span-2">
                        <h2 class="!text-4xl text-white">Ready to get started?</h2>
                        <p class="body-text !text-blue-100 !text-xl !mb-0">Sign up today and get 14 days free. No credit card required.</p>
                    </div>
                    <div class="md:text-right mt-6 md:mt-0">
                        <button class="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg shadow-md text-lg">Start Free Trial</button>
                    </div>
                </section>
            `
        },
        'content-team-grid': {
            name: 'Content: Team Grid',
            html: `
                <section class="bg-white p-12 rounded-lg shadow-xl border border-gray-200 mb-12">
                    <h2 class="!text-4xl text-center mb-12">Meet Our Team</h2>
                    <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        <div class="text-center"><img src="https://placehold.co/300x300/fca5a5/white?text=CEO" class="rounded-full w-32 h-32 mx-auto mb-4"><h3 class="!text-lg !mb-0">Alice Johnson</h3><span class="description-label accent-text !mb-0">CEO & Founder</span></div>
                        <div class="text-center"><img src="https://placehold.co/300x300/a5f3fc/white?text=CTO" class="rounded-full w-32 h-32 mx-auto mb-4"><h3 class="!text-lg !mb-0">Bob Smith</h3><span class="description-label accent-text !mb-0">CTO</span></div>
                        <div class="text-center"><img src="https://placehold.co/300x300/fef08a/white?text=Design" class="rounded-full w-32 h-32 mx-auto mb-4"><h3 class="!text-lg !mb-0">Carla Chen</h3><span class="description-label accent-text !mb-0">Head of Design</span></div>
                        <div class="text-center"><img src="https://placehold.co/300x300/a3e635/white?text=Sales" class="rounded-full w-32 h-32 mx-auto mb-4"><h3 class="!text-lg !mb-0">David Lee</h3><span class="description-label accent-text !mb-0">VP of Sales</span></div>
                    </div>
                </section>
            `
        },
        'content-ecom-grid': {
            name: 'Content: E-commerce Grid',
            html: `
                <div class="max-w-6xl mx-auto mb-12">
                    <h2 class="!text-4xl mb-8">New Arrivals</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div class="bg-white rounded-lg shadow border border-gray-200 p-4"><img src="https://placehold.co/400x400/f0abfc/white?text=Item 1" class="rounded mb-4"><h3 class="!text-lg">Product Name</h3><p class="body-text font-bold text-gray-900">$29.99</p><button class="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg text-sm">Add to Cart</button></div>
                        <div class="bg-white rounded-lg shadow border border-gray-200 p-4"><img src="https://placehold.co/400x400/a5b4fc/white?text=Item 2" class="rounded mb-4"><h3 class="!text-lg">Another Item</h3><p class="body-text font-bold text-gray-900">$45.00</p><button class="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg text-sm">Add to Cart</button></div>
                        <div class="bg-white rounded-lg shadow border border-gray-200 p-4"><img src="https://placehold.co/400x400/67e8f9/white?text=Item 3" class="rounded mb-4"><h3 class="!text-lg">Third Thing</h3><p class="body-text font-bold text-gray-900">$12.50</p><button class="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg text-sm">Add to Cart</button></div>
                        <div class="bg-white rounded-lg shadow border border-gray-200 p-4"><img src="https://placehold.co/400x400/fde047/white?text=Item 4" class="rounded mb-4"><h3 class="!text-lg">Fontastic</h3><p class="body-text font-bold text-gray-900">$99.00</p><button class="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg text-sm">Add to Cart</button></div>
                    </div>
                </div>
            `
        },
        'content-pricing-table': {
            name: 'Content: Pricing Table',
            html: `
                <section class="max-w-5xl mx-auto mb-12">
                    <div class="text-center mb-12"><h2 class="!text-5xl">Simple, transparent pricing</h2><p class="body-text max-w-2xl mx-auto text-lg text-gray-700">Choose the plan that's right for your team.</p></div>
                    <div class="grid md:grid-cols-3 gap-8">
                        <div class="bg-white rounded-lg shadow-lg border-2 border-gray-200 p-8 flex flex-col"><h3 class="!text-2xl mb-2">Starter</h3><p class="body-text mb-4 text-gray-600">For individuals.</p><p class="mb-6"><span class="text-5xl font-bold">$19</span> / mo</p><ul class="body-text space-y-2 mb-8 flex-grow"><li><strong>10 Projects</strong></li><li>Basic Analytics</li></ul><button class="w-full bg-white text-gray-800 font-bold py-3 px-6 rounded-lg shadow-md border border-gray-300">Get Started</button></div>
                        <div class="bg-blue-600 text-white rounded-lg shadow-2xl border-2 border-blue-700 p-8 flex flex-col relative -my-4"><span class="absolute top-0 -mt-3 bg-white text-blue-600 font-bold text-xs py-1 px-3 rounded-full uppercase accent-text">Most Popular</span><h3 class="!text-2xl mb-2 text-white">Pro</h3><p class="body-text mb-4 text-blue-100">For small teams.</p><p class="mb-6 text-white"><span class="text-5xl font-bold">$49</span> / mo</p><ul class="body-text space-y-2 mb-8 flex-grow text-blue-50"><li><strong>Unlimited Projects</strong></li><li>Advanced Analytics</li></ul><button class="w-full bg-white text-blue-600 font-bold py-3 px-6 rounded-lg shadow-md">Start Free Trial</button></div>
                        <div class="bg-white rounded-lg shadow-lg border-2 border-gray-200 p-8 flex flex-col"><h3 class="!text-2xl mb-2">Enterprise</h3><p class="body-text mb-4 text-gray-600">For organizations.</p><p class="mb-6 text-5xl font-bold">Custom</p><ul class="body-text space-y-2 mb-8 flex-grow"><li><strong>Unlimited Everything</strong></li><li>Dedicated Support</li></ul><button class="w-full bg-white text-gray-800 font-bold py-3 px-6 rounded-lg shadow-md border border-gray-300">Contact Sales</button></div>
                    </div>
                </section>
            `
        },
        'content-legal-text': {
            name: 'Content: Legal Text',
            html: `
                <div class="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-xl border border-gray-200 mb-12">
                    <h2 class="!text-4xl">Privacy Policy</h2>
                    <p class="unimportant-body">Last Updated: January 1, 2024</p>
                    <p class="long-yapping-desc">This is a test of very dense, legal-style text. It's important to see how the font renders in small sizes and with long paragraphs. The quick brown fox jumps over the lazy dog.</p>
                    <h3 class="!text-2xl mt-8 mb-4">1. Information We Collect</h3>
                    <p class="long-yapping-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
            `
        },
        'content-button-gallery': {
            name: 'Content: Button Gallery',
            html: `
                <div class="bg-white p-8 rounded-lg shadow-xl border border-gray-200 space-y-6 mb-12">
                    <h2 class="!text-3xl">Button Tests</h2>
                    <div class="flex flex-wrap gap-4 items-center">
                        <button class="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md">Primary Button</button>
                        <button class="bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg shadow-sm border border-gray-300">Secondary</button>
                        <button class="text-blue-600 font-bold py-3 px-6">Text Button</button>
                        <button class="bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-md text-sm">Small Red</button>
                        <button class="bg-blue-600 text-white font-bold py-4 px-10 rounded-lg shadow-md text-xl">Large Button</button>
                    </div>
                </div>
            `
        },
        'content-pangrams': {
            name: 'Content: Pangram Test',
            html: `
                <div class="bg-white p-8 rounded-lg shadow-xl border border-gray-200 mb-12">
                    <h2 class="!text-3xl mb-6">Pangram Test</h2>
                    <p class="body-text">The quick brown fox jumps over the lazy dog.</p>
                    <p class="body-text">Sphinx of black quartz, judge my vow. 12345.</p>
                    <p class="important-body">Pack my box with five dozen liquor jugs. &!?</p>
                    <p class="unimportant-body">Waltz, nymph, for quick jigs vex bud. 09876.</p>
                    <p class="long-yapping-desc">Glib jocks quiz nymph to vex dwarf. Grumpy wizards make toxic brew for the evil Queen and Jack.</p>
                </div>
            `
        }
    },
    
    // === 4. Content Sections 2 (10 Variants + None) ===
    'contentSections2': {
        'none': { name: '-- None --', html: '' },
        // NEW: Type Scale component
        'content-type-scale': {
            name: 'Content: Type Scale',
            html: `
                <div class="bg-white p-8 md:p-12 rounded-lg shadow-xl border border-gray-200 mb-12">
                    <h2 class="!text-3xl mb-6">Type Scale & Hierarchy</h2>
                    <h1>H1: The quick brown fox</h1>
                    <h2>H2: The quick brown fox</h2>
                    <h3>H3: The quick brown fox</h3>
                    <h4>H4: The quick brown fox</h4>
                    <h5>H5: The quick brown fox</h5>
                    <h6>H6: The quick brown fox</h6>
                    <p class="important-body">Important Body: The quick brown fox jumps over the lazy dog. 1234567890</p>
                    <p class="body-text">Body (p): The quick brown fox jumps over the lazy dog. 1234567890</p>
                    <p class="long-yapping-desc">Long Desc: The quick brown fox jumps over the lazy dog. 1234567890</p>
                    <p class="unimportant-body">Unimportant Body: The quick brown fox jumps over the lazy dog. 1234567890</p>
                    <span class="description-label accent-text">Description Label: The quick brown fox</span>
                    <blockquote class="accent-text">Blockquote: The quick brown fox jumps over the lazy dog.</blockquote>
                </div>
            `
        },
        'content-features-list': {
            name: 'Content: Features List',
            html: `
                <section class="max-w-4xl mx-auto bg-white p-12 rounded-lg shadow-xl border border-gray-200 mb-12">
                    <div class="grid md:grid-cols-3 gap-10">
                        <div>
                            <h3 class="!text-xl mb-2">Feature One</h3>
                            <p class="body-text">A paragraph describing the feature. Keep it short and to the point. 123.</p>
                        </div>
                        <div>
                            <h3 class="!text-xl mb-2">Feature Two</h3>
                            <p class="body-text">A paragraph describing the feature. Keep it short and to the point. 456.</p>
                        </div>
                        <div>
                            <h3 class="!text-xl mb-2">Feature Three</h3>
                            <p class="body-text">A paragraph describing the feature. Keep it short and to the point. 789.</p>
                        </div>
                    </div>
                </section>
            `
        },
        'content-logo-cloud': {
            name: 'Content: Logo Cloud',
            html: `
                <section class="bg-white p-12 rounded-lg shadow-xl border border-gray-200 mb-12">
                    <h3 class="!text-lg text-center text-gray-500 mb-8 accent-text">Trusted by teams at</h3>
                    <div class="grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
                        <p class="text-3xl text-gray-400 text-center font-bold">LogoOne</p>
                        <p class="text-3xl text-gray-400 text-center font-bold">Client</p>
                        <p class="text-3xl text-gray-400 text-center font-bold">Third</p>
                        <p class="text-3xl text-gray-400 text-center font-bold">Company</p>
                        <p class="text-3xl text-gray-400 text-center font-bold">Partner</p>
                        <p class="text-3xl text-gray-400 text-center font-bold">SixthCo</p>
                    </div>
                </section>
            `
        },
        'content-stats-bar': {
            name: 'Content: Stats Bar',
            html: `
                <div class="bg-white p-8 rounded-lg shadow-xl border border-gray-200 mb-12">
                    <div class="grid grid-cols-3 divide-x divide-gray-200 text-center">
                        <div>
                            <h2 class="!text-4xl !mb-0">10M+</h2>
                            <span class="description-label accent-text">Active Users</span>
                        </div>
                        <div>
                            <h2 class="!text-4xl !mb-0">50K</h2>
                            <span class="description-label accent-text">5-Star Reviews</span>
                        </div>
                        <div>
                            <h2 class="!text-4xl !mb-0">99.9%</h2>
                            <span class="description-label accent-text">Uptime</span>
                        </div>
                    </div>
                </div>
            `
        },
        'content-weights-light': {
            name: 'Content: Light Weights',
            html: `
                <div class="bg-white p-8 rounded-lg shadow-xl border border-gray-200 mb-12">
                    <h2 class="!text-3xl mb-6">Light Weights Test</h2>
                    <p class="body-text !text-2xl !font-thin">Font Weight 100: The quick brown fox.</p>
                    <p class="body-text !text-2xl !font-extralight">Font Weight 200: The quick brown fox.</p>
                    <p class="body-text !text-2xl !font-light">Font Weight 300: The quick brown fox.</p>
                </div>
            `
        },
        'content-weights-bold': {
            name: 'Content: Bold Weights',
            html: `
                <div class="bg-white p-8 rounded-lg shadow-xl border border-gray-200 mb-12">
                    <h2 class="!text-3xl mb-6">Bold Weights Test</h2>
                    <p class="body-text !text-2xl !font-medium">Font Weight 500: The quick brown fox.</p>
                    <p class="body-text !text-2xl !font-semibold">Font Weight 600: The quick brown fox.</p>
                    <p class="body-text !text-2xl !font-bold">Font Weight 700: The quick brown fox.</p>
                    <p class="body-text !text-2xl !font-extrabold">Font Weight 800: The quick brown fox.</p>
                    <p class="body-text !text-2xl !font-black">Font Weight 900: The quick brown fox.</p>
                </div>
            `
        },
        'content-numerals': {
            name: 'Content: Numerals',
            html: `
                <div class="bg-white p-8 rounded-lg shadow-xl border border-gray-200 mb-12">
                    <h2 class="!text-3xl mb-6">Numerals & Punctuation</h2>
                    <p class="body-text !text-2xl">0 1 2 3 4 5 6 7 8 9</p>
                    <p class="body-text">On 1/23/2024, the stock rose by 10.5% to $1,234.56!</p>
                    <p class="body-text">Is this right? (Yes!) He said: "Quote".</p>
                    <p class="body-text">The file is at C:\\Users\\Test. {Braces} & [Brackets].</p>
                    <p class="body-text">Email: name@example.com. Cost: $50-100*.</p>
                </div>
            `
        },
        'content-caps': {
            name: 'Content: Capitalization',
            html: `
                <div class="bg-white p-8 rounded-lg shadow-xl border border-gray-200 mb-12">
                    <h2 class="!text-3xl mb-6">Capitalization Test</h2>
                    <p class="body-text">Normal Sentence Case. The quick brown fox.</p>
                    <p class="body-text uppercase">UPPERCASE TEXT. THE QUICK BROWN FOX.</p>
                    <p class="body-text capitalize">Title Case Text. The Quick Brown Fox.</p>
                    <h2 class="!text-4xl uppercase">UPPERCASE HEADING 2</h2>
                    <h3 class="!text-2xl capitalize">Title Case Heading 3</h3>
                    <button class="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg uppercase text-sm">Uppercase Button</button>
                </div>
            `
        },
        'content-about-bio': {
            name: 'Content: About Me Bio',
            html: `
                <section class="max-w-4xl mx-auto grid md:grid-cols-3 gap-12 items-center bg-white p-12 rounded-lg shadow-xl border border-gray-200 mb-12">
                    <div class="md:col-span-1">
                        <img src="https://placehold.co/400x400/a5f3fc/white?text=Me" alt="Placeholder" class="w-full rounded-full shadow-md">
                    </div>
                    <div class="md:col-span-2">
                        <h2 class="!text-4xl">Hi, I'm Alex.</h2>
                        <p class="important-body !text-xl my-4">I'm a product designer who loves building clean, intuitive, and beautiful user interfaces.</p>
                        <p class="body-text">For the past 8 years, I've been working with startups and tech companies to help them solve complex problems with simple design. The quick brown fox jumps over the lazy dog.</p>
                        <button class="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg text-base mt-4">Get In Touch</button>
                    </div>
                </section>
            `
        },
        'content-ui-alerts': {
            name: 'Content: UI Alerts',
            html: `
                <div class="bg-white p-8 rounded-lg shadow-xl border border-gray-200 space-y-4 mb-12">
                    <h2 class="!text-3xl">Alerts & Notifications</h2>
                    <div class="p-4 rounded-md bg-blue-50 border border-blue-200"><p class="body-text !mb-0 text-blue-800"><strong class="font-bold">Info:</strong> This is an informational message. The quick brown fox.</p></div>
                    <div class="p-4 rounded-md bg-green-50 border border-green-200"><p class="body-text !mb-0 text-green-800"><strong class="font-bold">Success:</strong> Your action was completed successfully.</p></div>
                    <div class="p-4 rounded-md bg-yellow-50 border border-yellow-200"><p class="body-text !mb-0 text-yellow-800"><strong class="font-bold">Warning:</strong> Please check your inputs. 12345.</p></div>
                    <div class="p-4 rounded-md bg-red-50 border border-red-200"><p class="body-text !mb-0 text-red-800"><strong class="font-bold">Error:</strong> An error occurred while saving.</p></div>
                </div>
            `
        }
    },


    // === 5. Forms (10 Variants + None) ===
    'forms': {
        'none': { name: '-- None --', html: '' },
        'form-contact': {
            name: 'Form: Contact',
            html: `
                <div class="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-xl border border-gray-200 mb-12">
                    <div class="text-center"><h2 class="!text-5xl">Get in Touch</h2><p class="body-text max-w-lg mx-auto text-lg text-gray-700">We'd love to hear from you.</p></div>
                    <form class="mt-10 space-y-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div><label for="first-name" class="description-label accent-text !text-sm !mb-2">First Name</label><input type="text" id="first-name" class="w-full p-3 border border-gray-300 rounded-md shadow-sm text-base" placeholder="John"></div>
                            <div><label for="last-name" class="description-label accent-text !text-sm !mb-2">Last Name</label><input type="text" id="last-name" class="w-full p-3 border border-gray-300 rounded-md shadow-sm text-base" placeholder="Doe"></div>
                        </div>
                        <div><label for="email" class="description-label accent-text !text-sm !mb-2">Email</label><input type="email" id="email" class="w-full p-3 border border-gray-300 rounded-md shadow-sm text-base" placeholder="you@example.com"></div>
                        <div><label for="message" class="description-label accent-text !text-sm !mb-2">Message</label><textarea id="message" rows="6" class="w-full p-3 border border-gray-300 rounded-md shadow-sm text-base" placeholder="Your message..."></textarea></div>
                        <div class="text-center"><button class="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition-all text-lg">Send Message</button></div>
                    </form>
                </div>
            `
        },
        'form-login': {
            name: 'Form: Login',
            html: `
                <div class="max-w-md mx-auto bg-white p-8 md:p-12 rounded-lg shadow-xl border border-gray-200 mb-12">
                    <h2 class="!text-3xl text-center mb-6">Log In</h2>
                    <form class="space-y-6">
                        <div><label for="email-l" class="description-label accent-text !text-sm !mb-2">Email Address</label><input type="email" id="email-l" class="w-full p-3 border border-gray-300 rounded-md shadow-sm text-base"></div>
                        <div><label for="pass-l" class="description-label accent-text !text-sm !mb-2">Password</label><input type="password" id="pass-l" class="w-full p-3 border border-gray-300 rounded-md shadow-sm text-base"></div>
                        <button class="w-full bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition-all text-lg">Log In</button>
                        <p class="unimportant-body text-center !mb-0">Forgot your password?</p>
                    </form>
                </div>
            `
        },
        'form-signup': {
            name: 'Form: Signup',
            html: `
                <div class="max-w-md mx-auto bg-white p-8 md:p-12 rounded-lg shadow-xl border border-gray-200 mb-12">
                    <h2 class="!text-3xl text-center mb-2">Create Account</h2>
                    <p class="body-text text-center mb-6">Join the best platform ever.</p>
                    <form class="space-y-4">
                        <div><label for="name-s" class="description-label accent-text !text-sm !mb-2">Full Name</label><input type="text" id="name-s" class="w-full p-3 border border-gray-300 rounded-md shadow-sm text-base"></div>
                        <div><label for="email-s" class="description-label accent-text !text-sm !mb-2">Email Address</label><input type="email" id="email-s" class="w-full p-3 border border-gray-300 rounded-md shadow-sm text-base"></div>
                        <div><label for="pass-s" class="description-label accent-text !text-sm !mb-2">Password</label><input type="password" id="pass-s" class="w-full p-3 border border-gray-300 rounded-md shadow-sm text-base"></div>
                        <button class="w-full bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition-all text-lg">Sign Up</button>
                        <p class="unimportant-body text-center !text-xs !mb-0">By signing up, you agree to our Terms of Service.</p>
                    </form>
                </div>
            `
        },
        'form-settings': {
            name: 'Form: Settings Panel',
            html: `
                <div class="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-xl border border-gray-200 mb-12">
                    <h2 class="!text-3xl mb-8">Settings</h2>
                    <div class="space-y-6">
                        <div>
                            <h3 class="!text-2xl mb-4 border-b pb-2">Profile</h3>
                            <div class="grid md:grid-cols-2 gap-6">
                                <div><label for="first-p" class="description-label accent-text !text-sm !mb-2">First Name</label><input type="text" id="first-p" class="w-full p-3 border border-gray-300 rounded-md shadow-sm text-base" value="Alex"></div>
                                <div><label for="last-p" class="description-label accent-text !text-sm !mb-2">Last Name</label><input type="text" id="last-p" class="w-full p-3 border border-gray-300 rounded-md shadow-sm text-base" value="Johnson"></div>
                            </div>
                        </div>
                        <div>
                            <h3 class="!text-2xl mb-4 border-b pb-2">Notifications</h3>
                            <div class="space-y-3">
                                <label class="flex items-center body-text"><input type="checkbox" class="mr-3" checked> Email me for product updates.</label>
                                <label class="flex items-center body-text"><input type="checkbox" class="mr-3"> Monthly newsletter.</label>
                            </div>
                        </div>
                        <div class="text-right"><button class="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-md">Save Changes</button></div>
                    </div>
                </div>
            `
        },
        'form-checkout': {
            name: 'Form: Checkout',
            html: `
                <div class="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-xl border border-gray-200 mb-12">
                    <h2 class="!text-4xl mb-8">Checkout</h2>
                    <div class="grid md:grid-cols-2 gap-12">
                        <form class="space-y-6">
                            <h3 class="!text-2xl">Shipping Information</h3>
                            <div><label for="email-c" class="description-label accent-text !text-sm !mb-2">Email</label><input type="email" id="email-c" class="w-full p-3 border border-gray-300 rounded-md shadow-sm text-base"></div>
                            <div><label for="address-c" class="description-label accent-text !text-sm !mb-2">Address</label><input type="text" id="address-c" class="w-full p-3 border border-gray-300 rounded-md shadow-sm text-base"></div>
                        </form>
                        <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
                            <h3 class="!text-2xl mb-4">Order Summary</h3>
                            <div class="space-y-2 body-text">
                                <div class="flex justify-between"><span>Subtotal</span><span>$129.00</span></div>
                                <div class="flex justify-between"><span>Shipping</span><span>$5.00</span></div>
                                <div class="flex justify-between font-bold border-t pt-2 mt-2"><span>Total</span><span>$134.00</span></div>
                            </div>
                            <button class="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md mt-6">Place Order</button>
                        </div>
                    </div>
                </div>
            `
        },
        'form-survey': {
            name: 'Form: Survey',
            html: `
                <div class="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-xl border border-gray-200 mb-12">
                    <h2 class="!text-3xl text-center mb-6">Feedback Survey</h2>
                    <form class="space-y-6">
                        <div>
                            <label class="description-label accent-text !text-sm !mb-2">How satisfied are you?</label>
                            <div class="flex justify-between body-text">
                                <label><input type="radio" name="rating" class="mr-1"> 1</label>
                                <label><input type="radio" name="rating" class="mr-1"> 2</label>
                                <label><input type="radio" name="rating" class="mr-1"> 3</label>
                                <label><input type="radio" name="rating" class="mr-1"> 4</label>
                                <label><input type="radio" name="rating" class="mr-1"> 5</label>
                            </div>
                        </div>
                        <div>
                            <label for="comments" class="description-label accent-text !text-sm !mb-2">Any comments?</label>
                            <textarea id="comments" rows="5" class="w-full p-3 border border-gray-300 rounded-md shadow-sm text-base" placeholder="Your feedback..."></textarea>
                        </div>
                        <button class="w-full bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-md">Submit</button>
                    </form>
                </div>
            `
        },
        'form-newsletter': {
            name: 'Form: Newsletter Signup',
            html: `
                <div class="max-w-lg mx-auto bg-gray-100 p-8 md:p-12 rounded-lg shadow border border-gray-200 mb-12 text-center">
                    <h2 class="!text-3xl mb-4">Join Our Newsletter</h2>
                    <p class="body-text text-gray-700 mb-6">Get weekly font inspiration and product updates.</p>
                    <form class="flex">
                        <input type="email" class="w-full p-3 border border-gray-300 rounded-l-md shadow-sm text-base" placeholder="you@example.com">
                        <button class="bg-blue-600 text-white font-bold py-3 px-6 rounded-r-lg shadow-md">Subscribe</button>
                    </form>
                </div>
            `
        },
        'form-inputs-dark': {
            name: 'Form: Inputs (Dark)',
            html: `
                <div class="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700 mb-12">
                    <h2 class="!text-3xl mb-6 text-white">Form Elements (Dark)</h2>
                    <div class="space-y-4">
                        <div><label for="text-f-dark" class="description-label accent-text !text-sm !mb-2 !text-gray-300">Text Input</label><input type="text" id="text-f-dark" class="w-full p-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-base text-white" placeholder="Placeholder text..."></div>
                        <div><label for="area-f-dark" class="description-label accent-text !text-sm !mb-2 !text-gray-300">Text Area</label><textarea id="area-f-dark" rows="4" class="w-full p-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-base text-white" placeholder="Type here..."></textarea></div>
                    </div>
                </div>
            `
        },
        'form-split-image': {
            name: 'Form: Split Image',
            html: `
                <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-xl border border-gray-200 mb-12 grid md:grid-cols-2 overflow-hidden">
                    <div class="p-8 md:p-12">
                        <h2 class="!text-3xl mb-6">Create Account</h2>
                        <form class="space-y-4">
                            <div><label for="name-s2" class="description-label accent-text !text-sm !mb-2">Full Name</label><input type="text" id="name-s2" class="w-full p-3 border border-gray-300 rounded-md shadow-sm text-base"></div>
                            <div><label for="email-s2" class="description-label accent-text !text-sm !mb-2">Email</Mabel><input type="email" id="email-s2" class="w-full p-3 border border-gray-300 rounded-md shadow-sm text-base"></div>
                            <div><label for="pass-s2" class="description-label accent-text !text-sm !mb-2">Password</label><input type="password" id="pass-s2" class="w-full p-3 border border-gray-300 rounded-md shadow-sm text-base"></div>
                            <button class="w-full bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-md">Sign Up</button>
                        </form>
                    </div>
                    <div class="bg-gray-100 p-8 md:p-12 flex flex-col justify-center">
                        <img src="https://placehold.co/400x400/a5f3fc/white?text=Join" alt="Placeholder" class="w-full rounded-lg shadow-md">
                        <h3 class="!text-2xl mt-6">Join a community of designers.</h3>
                    </div>
                </div>
            `
        },
        'form-minimal': {
            name: 'Form: Minimal',
            html: `
                <div class="max-w-lg mx-auto mb-12">
                    <h2 class="!text-4xl text-center">Search Everything.</h2>
                    <form class="mt-6 flex">
                        <input type="text" class="w-full p-4 border border-gray-300 rounded-l-lg shadow-sm text-lg" placeholder="The quick brown fox...">
                        <button class="bg-blue-600 text-white font-bold py-4 px-8 rounded-r-lg shadow-md text-lg">Search</button>
                    </form>
                </div>
            `
        }
    },


    // === 6. Footers (6 Variants + None) ===
    'footers': {
        'none': { name: '-- None --', html: '' },
        'footer-multi-column': {
            name: 'Footer: Multi-column',
            html: `
                <footer class="bg-gray-800 text-gray-300 p-12 rounded-lg mt-12">
                    <div class="grid md:grid-cols-4 gap-8">
                        <div><h3 class="!text-lg text-white mb-4">Product</h3><ul class="space-y-2 unimportant-body !text-gray-300 !text-base"><li>Features</li><li>Pricing</li><li>Demo</li></ul></div>
                        <div><h3 class="!text-lg text-white mb-4">Company</h3><ul class="space-y-2 unimportant-body !text-gray-300 !text-base"><li>About Us</li><li>Careers</li><li>Blog</li></ul></div>
                        <div><h3 class="!text-lg text-white mb-4">Resources</h3><ul class="space-y-2 unimportant-body !text-gray-300 !text-base"><li>Docs</li><li>Support</li><li>API</li></ul></div>
                        <div><h3 class="!text-lg text-white mb-4">Newsletter</h3><p class="unimportant-body !text-gray-300 !text-base !mb-4">Get updates.</p><input type="email" class="w-full p-2 rounded text-gray-900" placeholder="you@example.com"></div>
                    </div>
                    <p class="unimportant-body text-center !text-gray-400 border-t border-gray-700 pt-8 mt-8 !mb-0">&copy; 2024 Font Checker Inc.</p>
                </footer>
            `
        },
        'footer-simple': {
            name: 'Footer: Simple',
            html: `
                <footer class="bg-white p-8 rounded-lg shadow border border-gray-200 mt-12">
                    <div class="flex justify-between items-center">
                        <p class="unimportant-body !mb-0">&copy; 2024 Your Company. All rights reserved.</p>
                        <ul class="flex gap-6 body-text !mb-0">
                            <li><a href="#" class="text-gray-500">Privacy</a></li>
                            <li><a href="#" class="text-gray-500">Terms</a></li>
                            <li><a href="#" class="text-gray-500">Contact</a></li>
                        </ul>
                    </div>
                </footer>
            `
        },
        'footer-dark-simple': {
            name: 'Footer: Dark Simple',
            html: `
                <footer class="bg-gray-800 text-gray-400 p-8 rounded-lg mt-12">
                    <div class="flex justify-between items-center">
                        <p class="unimportant-body !text-gray-400 !mb-0">&copy; 2024 Your Company. All rights reserved.</p>
                        <ul class="flex gap-6 body-text !mb-0">
                            <li><a href="#" class="text-gray-300">Privacy</a></li>
                            <li><a href="#" class="text-gray-300">Terms</a></li>
                            <li><a href="#" class="text-gray-300">Contact</a></li>
                        </ul>
                    </div>
                </footer>
            `
        },
        'footer-minimal': {
            name: 'Footer: Minimal',
            html: `
                <footer class="p-8 text-center mt-12">
                    <p class="unimportant-body !mb-0">A. Designer &mdash; Built with Font Checker</p>
                </footer>
            `
        },
        'footer-sitemap': {
            name: 'Footer: Sitemap',
            html: `
                <footer class="bg-white p-12 rounded-lg shadow border border-gray-200 mt-12">
                    <div class="grid md:grid-cols-5 gap-8">
                        <div class="md:col-span-2"><h3 class="!text-2xl !mb-2">LogoHere</h3><p class="unimportant-body !mb-0">A better way to design.</p></div>
                        <div><h3 class="!text-lg mb-4">Sitemap</h3><ul class="space-y-2 unimportant-body !text-base"><li>Home</li><li>About</li><li>Shop</li></ul></div>
                        <div><h3 class="!text-lg mb-4">Social</h3><ul class="space-y-2 unimportant-body !text-base"><li>Twitter</li><li>Instagram</li><li>LinkedIn</li></ul></div>
                        <div><h3 class="!text-lg mb-4">Legal</h3><ul class="space-y-2 unimportant-body !text-base"><li>Privacy</li><li>Terms</li></ul></div>
                    </div>
                </footer>
            `
        },
        'footer-fat': {
            name: 'Footer: Fat',
            html: `
                <footer class="bg-gray-100 p-12 rounded-lg mt-12">
                    <div class="text-center mb-8">
                        <h2 class="!text-3xl">LogoHere</h2>
                        <ul class="flex gap-6 justify-center body-text !mb-0 mt-4">
                            <li><a href="#" class="font-semibold text-gray-700">Home</a></li>
                            <li><a href="#" class="text-gray-500">About</a></li>
                            <li><a href="#" class="text-gray-500">Blog</a></li>
                            <li><a href="#" class="text-gray-500">Careers</a></li>
                            <li><a href="#" class="text-gray-500">Contact</a></li>
                        </ul>
                    </div>
                    <p class="unimportant-body text-center !text-gray-500 border-t border-gray-300 pt-8 mt-8 !mb-0">&copy; 2024 Font Checker Inc.</p>
                </footer>
            `
        }
    }
};