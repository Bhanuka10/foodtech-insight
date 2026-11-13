// Source: FoodTech Insight, Volume 3, Issue 1 (November 2026). Titles follow the
// magazine's contents pages; descriptions are drawn from each article's opening text.
const SUSL = 'Sabaragamuwa University of Sri Lanka'
const DFST = `Department of Food Science and Technology, Faculty of Applied Sciences, ${SUSL}`
const EXPORT_AG = `Department of Export Agriculture, Faculty of Agricultural Sciences, ${SUSL}`

export const articles = [
  {
    no: 1, page: 12, category: 'Food Authenticity', kicker: 'Isotope Ratio Mass Spectrometry',
    title: 'A Silent Detective for Food Authenticity',
    description: 'As supply chains lengthen, Isotope Ratio Mass Spectrometry reads the subtle isotopic fingerprints left by nature and farming practices to see beyond labels and expose food fraud.',
    authors: ['H.M.H. Ruwanthi Herathmenike'], affiliation: DFST,
  },
  {
    no: 2, page: 15, category: 'Smart Packaging', kicker: "Nature's Warning System",
    title: 'A Color-Changing Film for Smart Packaging',
    description: 'Spoiling meat and seafood release invisible compounds like ammonia and biogenic amines. A natural-pigment, corn starch-based film lets the container itself give a clear answer.',
    authors: ['Amashi Kuruppuge'], affiliation: DFST,
  },
  {
    no: 3, page: 17, category: 'Food Preservation', kicker: null,
    title: 'Ultrasound Technology for Efficient Food Preservation',
    description: 'Heat treatment remains the most widely used preservation method. Ultrasound offers a gentler route to microbial inactivation while protecting safety, quality and shelf life.',
    authors: ['A.R. Thathsarani', 'Lasitha Madushanka'], affiliation: `Department of Bio Systems Technology, Faculty of Technology, ${SUSL}`,
  },
  {
    no: 4, page: 20, category: 'Nutrition & Health', kicker: 'Low-Glycemic Index Confectionery',
    title: 'A New Approach to Healthier Indulgence',
    description: 'Confectionery is tied to high sugar and sharp rises in blood glucose. Low-glycemic index sweets promise the pleasure of indulgence with healthier metabolic outcomes.',
    authors: ['R.M.A.D. Ranasinghe'], affiliation: DFST,
  },
  {
    no: 5, page: 22, category: 'Food Technology', kicker: 'From Pixel to Plate',
    title: 'Printing the Future of What We Eat',
    description: '3D food printers deposit edible "food inks" layer by layer from a digital design file, enabling customised shapes, textures and nutritional values for the people who need them most.',
    authors: ['Gayathma Weerawanni', 'Dr. Nishala Wedamulla', 'Prof. W.A.J.P. Wijesinghe'], affiliation: 'Faculty of Animal Science and Export Agriculture, Uva Wellassa University of Sri Lanka',
  },
  {
    no: 6, page: 24, category: 'Biotechnology', kicker: 'Precision Fermentation',
    title: 'Engineering Microbes to Produce Animal-Free Proteins',
    description: 'Livestock farming creates around 14 to 15 percent of global greenhouse gas emissions. Precision fermentation programs microorganisms to produce animal proteins without raising animals.',
    authors: ['G.D.A.L. Senarathna'], affiliation: DFST,
  },
  {
    no: 7, page: 26, category: 'Functional Foods', kicker: 'Edible Living Microbial Toppings',
    title: 'A Novel Approach to Probiotic Functional Foods',
    description: 'What if food art could come to life? Living microbial toppings embed probiotics in a β-glucan-rich matrix, making functional foods both visually captivating and biologically active.',
    authors: ['Mithurzha Ravichandran', 'Madara Thilakarathne'], affiliation: DFST,
  },
  {
    no: 8, page: 29, category: 'Food Science', kicker: 'The Coffee Paradox',
    title: 'From Comfort to Jitters',
    description: 'One person finds calm and focus, another feels jittery or anxious. The paradox lies in the chemistry of caffeine and in our own genetic blueprints.',
    authors: ['Dananjani Nuwanthika Hapuarachchi'], affiliation: DFST,
  },
  {
    no: 9, page: 32, category: 'Plant Biotechnology', kicker: 'Beyond the Needle',
    title: 'The Future of Vaccination Grown in Plants',
    description: 'What if your next vaccine came from a plant instead of a syringe? Plant-made vaccines offer a cheaper, decentralised answer to the weaknesses the pandemic exposed.',
    authors: ['R.M.K.D. Rathnayake', 'P.K.T.M. Dharmasena', 'N.W.J.V. Hansika', 'N.M.H.I. Nayakarathna'], affiliation: EXPORT_AG,
  },
  {
    no: 10, page: 35, category: 'Postharvest Technology', kicker: "Nature's Freshness Shield",
    title: 'Recent Advances in Edible Coatings for Fresh Produce',
    description: 'Fresh fruits and vegetables are highly perishable. Edible coatings act as protective films that slow respiration, moisture loss, oxidation and microbial activity after harvest.',
    authors: ['D.M.G.C.M. Medawaththa'], affiliation: 'Rajarata University of Sri Lanka',
  },
  {
    no: 11, page: 38, category: 'Food Law', kicker: 'Food for Health and Welfare',
    title: 'A Comparative Study of Food Law in Sri Lanka and India',
    description: "Sri Lanka's Food Act No. 26 of 1980 centres on safety and adulteration, while India's framework extends to food security and nutrition. A comparative reading of two legal systems.",
    authors: ['W.M.N. Akash Dinendra'], affiliation: 'Department of Commercial Law, Faculty of Law, University of Colombo',
  },
  {
    no: 12, page: 41, category: 'Value Addition', kicker: 'From Forest Seed to Chocolate Bar',
    title: "Unlocking Mahua Oil's Commercial Potential",
    description: 'Rising cocoa butter prices have intensified the search for sustainable lipid alternatives. Mahua, a forest-derived oilseed found in Sri Lanka, shows strong potential as a confectionery fat.',
    authors: ['R.C.N. Thilakarathna', 'Lee Yee Ying'], affiliation: 'School of Science, Monash University, Malaysia',
  },
  {
    no: 13, page: 44, category: 'Nano-Agriculture', kicker: null,
    title: 'From Soil Nanoparticles to Superfood Properties',
    description: 'Blueberries, kale and quinoa owe their superfood status to genetics, or so we thought. New research points to a crucial, unrecognised factor: naturally occurring soil nanoparticles.',
    authors: ['N.E.N.P. Wijerathne'], affiliation: EXPORT_AG,
  },
  {
    no: 14, page: 46, category: 'Sustainability', kicker: 'From Waste to Wealth',
    title: 'The Evolution of Upcycled Food Systems',
    description: 'One-third of all food produced for human consumption is lost or wasted while food insecurity persists. Upcycled food systems turn by-products into valuable new ingredients.',
    authors: ['K.R.N.N. Jayathilaka'], affiliation: 'Department of Food Science and Technology, Faculty of Applied Sciences, University of Sri Jayewardenepura',
  },
  {
    no: 15, page: 49, category: 'Future Foods', kicker: 'Tiny Greens, Big Impact',
    title: 'The Future of Nutrition and Food Technology Through Microgreens',
    description: 'Harvested at a young stage of growth, microgreens carry incredible nutritional potential and open innovative possibilities for food science and technology.',
    authors: ['K.B.U. Udari'], affiliation: EXPORT_AG,
  },
  {
    no: 16, page: 52, category: 'Digital Innovation', kicker: null,
    title: 'Digital Twins in the Food Industry',
    description: 'A digital twin is a virtual model of a food processing operation, dynamically linked to its real-world counterpart through live sensor data, analytics, AI and cloud computing.',
    authors: ['K.D. Abeysinghe'], affiliation: DFST,
  },
  {
    no: 17, page: 56, category: 'Food Safety', kicker: 'From Root to Risk',
    title: 'The Story of Linamarin in Cassava',
    description: 'Cassava is a staple for over 500 million people worldwide, yet its roots contain linamarin, a cyanogenic compound that demands careful processing before consumption.',
    authors: ['K.D. Wanigathunga'], affiliation: DFST,
  },
  {
    no: 18, page: 59, category: 'Food Literacy', kicker: null,
    title: 'Media Myths vs Real Food Science',
    description: 'Social media platforms, news outlets and blogs often simplify or sensationalise scientific findings, giving rise to food myths that conflict with established food science.',
    authors: ['K. Sarvankany'], affiliation: DFST,
  },
  {
    no: 19, page: 61, category: 'Alternative Proteins', kicker: 'Microbial Proteins',
    title: 'The Sustainable Protein Frontier Beyond Animal and Plant Sources',
    description: 'As the global population heads toward 9.7 billion by 2050, a quiet revolution in microbial proteins reaches beyond the limits of animal and plant sources.',
    authors: ['N.W.J.V. Hansika'], affiliation: EXPORT_AG,
  },
  {
    no: 20, page: 64, category: 'Nutrition & Health', kicker: null,
    title: 'Ultra-Processed Foods: Convenience at a Cost',
    description: 'Processed foods extend shelf life and reduce post-harvest losses, yet growing evidence links excessive consumption of ultra-processed foods with adverse health outcomes.',
    authors: ['Dr. T.C. Kananke'], affiliation: `Senior Lecturer, ${DFST}`,
  },
  {
    no: 21, page: 68, category: 'Dairy Innovation', kicker: null,
    title: 'Driving Innovation and Value Addition in Modern Dairy Products',
    description: 'Enzymes such as chymosin, lipase and lactase act as natural biocatalysts, transforming milk into cheese, lactose-free milk and functional dairy products with improved texture and nutrition.',
    authors: ['R.M.K.S.L. Rathnayaka'], affiliation: DFST,
  },
  {
    no: 22, page: 71, category: 'Food Traceability', kicker: null,
    title: 'Edible Microlasers for Smart Food Traceability and Quality Monitoring',
    description: 'Printed barcodes can be damaged, removed or manipulated. Edible microlasers made from food-grade materials carry identification and quality data inside the food itself.',
    authors: ['S.T. Samarawickrama'], affiliation: 'Department of Food Science and Technology, Faculty of Applied Sciences, University of Sri Jayewardenepura',
  },
  {
    no: 23, page: 74, category: 'Food Preservation', kicker: 'Beyond Heat',
    title: 'How Non-Thermal Technologies Are Transforming Food Preservation',
    description: 'High temperatures degrade nutrients, texture, colour and flavour. High pressure processing, pulsed electric fields, cold plasma and ultrasound preserve food without the heat.',
    authors: ['A.H.S. Athukorala'], affiliation: DFST,
  },
  {
    no: 24, page: 78, category: 'Food Safety', kicker: 'Safe on Paper, Risky in Reality',
    title: "The Blind Spots in Today's Food Safety Systems",
    description: 'Food laws written for restaurants, markets and factories struggle with cloud kitchens, home-based sellers and app-based delivery. Where comprehensive systems fail in practice.',
    authors: ['K.A.D.S.C. Perera'], affiliation: DFST,
  },
  {
    no: 25, page: 81, category: 'Plant-Based Alternatives', kicker: null,
    title: 'Yam-Based Milk Alternatives',
    description: 'Lactose intolerance, sustainability and ethical concerns drive demand for plant-based milks. Could yam milk stand alongside soy, almond and oat as a sustainable dairy alternative?',
    authors: ['H.A.P. Sanudi Dinara Jayawardana'], affiliation: 'University of Sri Jayewardenepura',
  },
  {
    no: 26, page: 83, category: 'Gut Health', kicker: null,
    title: 'Could Your Gut Be Affecting Your Mood?',
    description: 'Trillions of microorganisms in the gut communicate constantly with the brain through the gut-brain axis. When that community falls out of balance, mood may follow.',
    authors: ['P.G.I. Dias'], affiliation: DFST,
  },
].map((a) => ({ ...a, image: `/images/articles/ft${String(a.no).padStart(2, '0')}.jpg` }))
