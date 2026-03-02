
const USD_TO_INR = 84;
export const inr = (usd) => usd * USD_TO_INR;

const PROF_NAMES = {
    'Electronics': [
        'Pro-Connect Wireless Headphones', 'Acoustix Bluetooth Speaker', 'Studio-X Condenser Mic', 'SpeedBeam Dual-Band Router',
        'SilencePro Noise Cancelling Buds', 'SmartHub Home Controller', 'Vue4K Ultra HD Camera', 'ClickMaster Mechanical Keyboard',
        'PrecisionFlow Optical Mouse', 'VisionPro Ergonomic Monitor', 'DataVault External SSD', 'ChargeLink Multi-Port Station',
        'PureSound Audio Interface', 'GamerGear Pro Controller', 'StreamDeck Content Console', 'SafeCam Security System',
        'ThermoSmart Digital Meter', 'BeamMax Portable Projector', 'SolarLink Power Bank', 'VibeCheck Studio Monitors'
    ],
    'Smartphones': [
        'NexGen S24 Ultra', 'Titanium Pro Max 15', 'PixelVision 8 Pro', 'Velocity 12 Flagship', 'Infinite 14 Ultra',
        'Aeon Phone Gold', 'Matrix X1 Prime', 'EdgePro 40 Plus', 'Ocular X7 Ultra', 'Zenith X100 Pro',
        'FoldMaster 5 Elite', 'Compact One X', 'Rush Gaming Phone', 'LiteBeam S1', 'SafeCell Privacy Phone',
        'Aura Pro Z', 'Nova X Ultra', 'Swift Z1', 'PrimeView Pro', 'Aero Phone Lite'
    ],
    'Laptops & Computers': [
        'SilverBook Pro 14', 'WorkForce Desktop XT', 'AeroBlade Gaming Laptop', 'ZenPad 2-in-1', 'PowerStation Pro',
        'UltraSlim Zenbook', 'Titan Gaming Tower', 'CloudBook Elite', 'CreativePad Pro', 'DevMachine X1',
        'LogicBook Air', 'DataCruiser Mini PC', 'PixelBook Plus', 'GraphicMaster Studio', 'SecureCore Server',
        'StreamLine Laptop', 'BudgetBound PC', 'EduTasker Netbook', 'OfficePro Station', 'Legacy Desktop XL'
    ],
    'Fashion & Clothing': [
        'Classic Essential Tee', 'Premium Denim Jeans', 'Urban Explorer Hoodie', 'Executive Silk Blazer', 'Summer Breeze Dress',
        'ActiveWear Pro Leggings', 'Autumn Wool Coat', 'Coastal Linen Shirt', 'Midnight Leather Jacket', 'Royal Velvet Evening Wear',
        'FlexFit Gym Shorts', 'Classic Polo Shirt', 'Winter Guard Parka', 'Boho Chic Skirt', 'Tech-Wear Cargo Pants',
        'Vintage Knit Sweater', 'LoungeComfort Set', 'Elite Sport Jersey', 'Urban Streetwear Jacket', 'SoftTouch Cashmere Scarf'
    ],
    'Footwear': [
        'SpeedRun Performance Sneakers', 'Classic Leather Loafers', 'Urban Trek Hiking Boots', 'CloudStep Walking Shoes', 'Midnight Formal Oxfords',
        'AeroFit Running Trainers', 'Rugged Terrain Boots', 'Elite Court Basketball Shoes', 'Summer Slide Sandals', 'ProFlex Training Shoes',
        'Vintage High Top Sneakers', 'Executive Suede Boots', 'LiteWeight Joggers', 'Mountain Peak Hikers', 'StreetStyle Canvas Shoes',
        'ComfortSole Work Boots', 'Agility Soccer Cleats', 'Grand Slam Tennis Shoes', 'SlipOn Ease Loafers', 'Velociti Sprint Spikes'
    ],
    'Home & Living': [
        'Minimalist Velvet Sofa', 'Solid Oak Dining Table', 'CloudComfort Queen Bed', 'Artisan Coffee Table', 'Modernist Bookshelf',
        'ErgoEase Office Chair', 'Vintage Style Chandelier', 'PureAir Humidifier', 'SmartFill Water Filter', 'ZenGarden Desk Lamp',
        'Luxury Memory Foam Pillow', 'Egyptian Cotton Sheet Set', 'Bamboo Bath Mat', 'Thermal Blackout Curtains', 'Floating Wall Shelves',
        'Decorative Ceramic Vase', 'SoftPlush Area Rug', 'Automatic Scent Diffuser', 'Modern Geometric Mirror', 'Cozy Knit Throw Blanket'
    ],
    'Sports & Outdoors': [
        'ProStream Aerodynamic Bike', 'PeakPerformance Yoga Mat', 'IronGrip Dumbbell Set', 'TrailMaster Camping Tent', 'HydraFlow Water Bottle',
        'CarbonFiber Tennis Racket', 'CoreStrength Exercise Ball', 'Outdoor Pro Backpack', 'Agility Speed Rope', 'All-Weather Sleeping Bag',
        'Tournament Size Soccer Ball', 'ProHoop Basketball System', 'Precision Golf Club Set', 'StableGrip Gym Gloves', 'Folding Camping Chair',
        'Multi-Tool Survival Kit', 'High-Vis Running Vest', 'DeepSea Snorkel Mask', 'Portable Grill Master', 'SkatePro Longboard'
    ],
    'Watches & Accessories': [
        'Chronos Gold Edition Watch', 'SilverLink Classic Watch', 'SmartBand Fitness Tracker', 'Aviator Polarized Shades', 'Executive Leather Wallet',
        'Titanium Belt Buckle', 'Minimalist Silver Cuff', 'Luxury Silk Tie', 'TravelConnect Passport Holder', 'Anti-Blue Light Glasses',
        'Digital Master Divers Watch', 'Vintage Mechanical Watch', 'RFID Blocking Card Holder', 'Premium Scarf Set', 'Classic Cufflinks Pair',
        'Retro Wayfarer Sunglasses', 'SportDigital Waterproof Watch', 'Sleek Laptop Sleeve', 'HeavyDuty Travel Duffel', 'Designer Key Ring'
    ],
    'Health & Beauty': [
        'PureGlow Face Serum', 'Vitality Herbal Shampoo', 'SilkTouch Body Lotion', 'Radiant Skin Cleanser', 'HydraMist Facial Spray',
        'Essential Oils Sampler', 'ProCare Electric Brush', 'Natural Glow Makeup Kit', 'RelaxMax Bath Salts', 'SunGuard SPF 50',
        'NourishHair Moroccan Oil', 'DeepClean Charcoal Mask', 'FreshBreath Whitening Kit', 'SculptPro Hair Gel', 'VelvetSmooth Shaving Cream',
        'Organic Night Cream', 'DailyActive Vitamins', 'PureZen Massage Oil', 'ClearCare Acne Treatment', 'FloralBloom Perfume'
    ],
    'Kitchen Appliances': [
        'QuickBrew Espresso Machine', 'PowerMix Stand Mixer', 'CrispAir Fryer Pro', 'MultiChef Slow Cooker', 'TurboGrind Blender',
        'SmartToast 4-Slot Toaster', 'PureSteak Indoor Grill', 'FreshPress Juicer', 'AutoClean Rice Cooker', 'PreciseTemp Electric Kettle',
        'ChefMaster Knife Set', 'Digital Meat Thermometer', 'SpaceSaver Food Vacuum Sealer', 'ProBake Convection Oven', 'EasySlice Electric Mandoline',
        'SilentFlow Dishwasher', 'PowerCool Wine Fridge', 'RapidFreeze Ice Maker', 'MicroChef Solo Microwave', 'InfiniteHeat Induction Cooktop'
    ],
    'Toys & Games': [
        'Matrix VR Headset', 'Infinite Blocks Building Set', 'SafeFly Remote Drone', 'QuestBoard Strategy Game', 'SoftPlush Teddy Bear',
        'Retro Arcade Console', 'ScienceLab Mystery Kit', 'Speedster Race Track', 'PuzzleMaster 1000pcs', 'MusicBox Learning Toy',
        'GrandMaster Chess Set', 'BattleBot Remote Robot', 'DinoWorld Action Figures', 'SpaceStation Play Set', 'Creative Art Easel',
        'BubbleMagic Machine', 'Outdoor Playhouse XL', 'MiniStrum Ukulele', 'MegaDart Blaster', 'Classic Wood Train Set'
    ]
};

export const ALL_PRODUCTS = (() => {
    const departments = [
        { name: 'Electronics', icon: '🎧', images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e', 'https://images.unsplash.com/photo-1628202926206-c63a34b1618f', 'https://images.unsplash.com/photo-1583394838336-acd97773ecf1', 'https://images.unsplash.com/photo-1599666505327-7758b44a9985', 'https://images.unsplash.com/photo-1613040819284-b3f705d047ee', 'https://images.unsplash.com/photo-1546435770-a3e426bf472b', 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a', 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0', 'https://images.unsplash.com/photo-1572536132350-b6d8b3efbb94', 'https://images.unsplash.com/photo-1605648916319-cf082f7524a1'], min: 200, max: 1500 },
        { name: 'Smartphones', icon: '📱', images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569', 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf', 'https://images.unsplash.com/photo-1598327105666-5b89351aff97', 'https://images.unsplash.com/photo-1678911820864-e2c567c655d7', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9', 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd', 'https://images.unsplash.com/photo-1567581935884-3349723552ca', 'https://images.unsplash.com/photo-1573148195902-7c093ac9aef7', 'https://images.unsplash.com/photo-1616348436168-de43ad0db179', 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3'], min: 400, max: 2000 },
        { name: 'Laptops & Computers', icon: '💻', images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8', 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45', 'https://images.unsplash.com/photo-1603302576837-37561b2e2302', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853', 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2', 'https://images.unsplash.com/photo-1531297484001-80022131f5a1', 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed', 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5', 'https://images.unsplash.com/photo-1515248187934-018525bca30c', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c'], min: 800, max: 3500 },
        { name: 'Fashion & Clothing', icon: '👕', images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f', 'https://images.unsplash.com/photo-1483985988355-763728e1935b', 'https://images.unsplash.com/photo-1539109136881-3be0616acd4e', 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d', 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2', 'https://images.unsplash.com/photo-1564859228273-274232fdb516', 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea', 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105', 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f', 'https://images.unsplash.com/photo-1475180098004-ca77a66827ae'], min: 30, max: 300 },
        { name: 'Footwear', icon: '👟', images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff', 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb', 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a', 'https://images.unsplash.com/photo-1620138546344-7b2c0b051ed3', 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2', 'https://images.unsplash.com/photo-1549298916-b41d501d3772', 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2', 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77', 'https://images.unsplash.com/photo-1491553895911-0055eca6402d', 'https://images.unsplash.com/photo-1539185441755-769473a23570'], min: 50, max: 500 },
        { name: 'Home & Living', icon: '🏠', images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc', 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88', 'https://images.unsplash.com/photo-1507473885765-e6ed657f9959', 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8', 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca', 'https://images.unsplash.com/photo-1524758631624-e2822e304c36', 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688', 'https://images.unsplash.com/photo-1534349762230-e09ca93424d9', 'https://images.unsplash.com/photo-1513694203232-719a280e022f'], min: 100, max: 1200 },
        { name: 'Sports & Outdoors', icon: '⚽', images: ['https://images.unsplash.com/photo-1485965120184-e220f721d03e', 'https://images.unsplash.com/photo-1592709823125-a191f07a2a5e', 'https://images.unsplash.com/photo-1584735975097-10950337f717', 'https://images.unsplash.com/photo-1592419044706-39796d40f98c', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62', 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b', 'https://images.unsplash.com/photo-1541534741688-6078c6bd35e5', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48', 'https://images.unsplash.com/photo-1519861531153-f519d3a3df99'], min: 20, max: 800 },
        { name: 'Watches & Accessories', icon: '⌚', images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30', 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49', 'https://images.unsplash.com/photo-1547949003-9792a18a2601', 'https://images.unsplash.com/photo-1511499767390-903390e6fbc4', 'https://images.unsplash.com/photo-1522338140262-f46f591261c2', 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade', 'https://images.unsplash.com/photo-1524592094714-0f0654e20314', 'https://images.unsplash.com/photo-1514806862131-86a0dc6ecaf2', 'https://images.unsplash.com/photo-1510250693990-25e24b784a68', 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6'], min: 40, max: 900 },
        { name: 'Health & Beauty', icon: '💄', images: ['https://images.unsplash.com/photo-1541643600914-78b084683601', 'https://images.unsplash.com/photo-1612817288484-6f916006741a', 'https://images.unsplash.com/photo-1522338140262-f46f591261c2', 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc', 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108', 'https://images.unsplash.com/photo-1556228720-195a672e8a03', 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881', 'https://images.unsplash.com/photo-1596462502278-27bfaf41039a', 'https://images.unsplash.com/photo-1590439471364-192aa70c0b53', 'https://images.unsplash.com/photo-1601612620925-8a439b7b6553'], min: 15, max: 150 },
        { name: 'Kitchen Appliances', icon: '🍳', images: ['https://images.unsplash.com/photo-1544233726-9f1d2b27be8b', 'https://images.unsplash.com/photo-1626074353765-517a681e40be', 'https://images.unsplash.com/photo-1594385208974-2e75f9d3bb4a', 'https://images.unsplash.com/photo-1559339352-11d035aa65de', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a', 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7', 'https://images.unsplash.com/photo-1516641396056-0ce60a85d49f', 'https://images.unsplash.com/photo-1584915664112-629b3528b18a', 'https://images.unsplash.com/photo-1506368249639-73a05d6f6429', 'https://images.unsplash.com/photo-1583394293235-ef801c6d427d'], min: 40, max: 600 },
        { name: 'Toys & Games', icon: '🎮', images: ['https://images.unsplash.com/photo-1606813907291-d86efa9b94db', 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e', 'https://images.unsplash.com/photo-1585366119957-e556f4d0234a', 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae', 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac', 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b', 'https://images.unsplash.com/photo-1558060370-d644479cb6f7', 'https://images.unsplash.com/photo-1533513613852-72212d261fa2', 'https://images.unsplash.com/photo-1560416313-414b33c856a9', 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1'], min: 10, max: 400 }
    ];

    const products = [];
    let currentId = 1;

    departments.forEach(dept => {
        const profNames = PROF_NAMES[dept.name] || [];
        for (let i = 1; i <= 20; i++) {
            const id = currentId++;
            // New logic for varied average pricing per category
            const spread = dept.max - dept.min;
            const basePrice = dept.min + ((id * 47) % spread);
            const imgIndex = (i - 1) % dept.images.length;
            const name = profNames[i - 1] || `${dept.name} Premium Item ${i}`;

            products.push({
                id: id,
                name: name,
                price: inr(basePrice),
                oldPrice: inr(basePrice * 1.25), // Dynamic old price (25% markup)
                category: dept.name,
                rating: 4.5 + (id % 6) * 0.1 > 5 ? 5.0 : 4.5 + (id % 6) * 0.1,
                reviews: 120 + (id * 13) % 400,
                emoji: dept.icon,
                tag: i < 6 ? 'Bestseller' : 'Trending',
                image: `${dept.images[imgIndex]}?auto=format&fit=crop&q=80&w=800&sig=${id}`,
                desc: `High-performance ${dept.name.toLowerCase()} for daily use.`,
                longDesc: `Experience the best in ${dept.name.toLowerCase()} with our premium ${name}. Built for quality and durability.`,
                specs: [{ label: 'Warranty', value: '1 Year' }, { label: 'Status', value: 'In Stock' }]
            });
        }
    });

    return products;
})();

export const getProductById = (id) =>
    ALL_PRODUCTS.find(p => String(p.id) === String(id)) || null;
