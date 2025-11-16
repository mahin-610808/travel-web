// Extended travel data for search functionality with specific properties
const travelData = {
    "paris": [
        {
            name: "Eiffel View Luxury Apartment",
            image: "images/paris-apartment.jpg",
            description: "Stunning apartment with direct Eiffel Tower views in the heart of Paris",
            price: "$320/night",
            rating: "4.9",
            amenities: ["WiFi", "Full Kitchen", "Air Conditioning", "Heating", "Eiffel Tower View", "Balcony"]
        }
    ],
    "london": [
        {
            name: "Thames Riverside Penthouse",
            image: "images/london-penthouse.jpg",
            description: "Modern penthouse with panoramic Thames River views",
            price: "$380/night",
            rating: "4.9",
            amenities: ["WiFi", "Full Kitchen", "Air Conditioning", "River View", "Balcony", "Gym"]
        }
    ],
    "new york": [
        {
            name: "Central Park Luxury Condo",
            image: "images/nyc-centralpark.jpg",
            description: "Luxurious condo overlooking Central Park in Manhattan",
            price: "$450/night",
            rating: "4.9",
            amenities: ["WiFi", "Gourmet Kitchen", "Air Conditioning", "Park View", "Doorman", "Fitness Center"]
        }
    ],
    "default": [
        {
            name: "City Center Luxury Apartment",
            image: "images/city-luxury.jpg",
            description: "Premium apartment in the city center with modern amenities",
            price: "$180/night",
            rating: "4.6",
            amenities: ["WiFi", "Full Kitchen", "Air Conditioning", "City View", "Gym", "Concierge"]
        }
    ]
};

// Extended place data for all destinations
const placeData = {
    "turkey": {
        name: "Turkey",
        image: "images/turkey.jpg",
        description: "Discover the magical land where East meets West. Turkey offers a unique blend of ancient history, stunning landscapes, and vibrant culture.",
        highlights: ["Hagia Sophia", "Cappadocia", "Pamukkale", "Ephesus", "Bosphorus Cruise"],
        price: "Packages starting from $200",
        bestTime: "April to May & September to October",
        duration: "7-10 days",
        visa: "E-Visa available for most countries"
    },
    "france": {
        name: "France",
        image: "images/france.jpg",
        description: "Experience the romance, art, and cuisine of France. From the iconic Eiffel Tower in Paris to the lavender fields of Provence.",
        highlights: ["Eiffel Tower", "Louvre Museum", "French Riviera", "Mont Saint-Michel", "Wine Tasting"],
        price: "Packages starting from $400",
        bestTime: "April to June & September to October",
        duration: "5-12 days",
        visa: "Schengen Visa required"
    }
    // ... other place data remains the same
};

// DOM Elements
const popularPlacesLink = document.getElementById('popularPlacesLink');
const travelOutsideLink = document.getElementById('travelOutsideLink');
const onlinePackagesLink = document.getElementById('onlinePackagesLink');
const bookingHistoryLink = document.getElementById('bookingHistoryLink');
const popularPlacesSection = document.getElementById('popularPlacesSection');
const travelOutsideSection = document.getElementById('travelOutsideSection');
const onlinePackagesSection = document.getElementById('onlinePackagesSection');
const searchForm = document.getElementById('searchForm');
const searchResults = document.getElementById('searchResults');
const resultsContainer = document.getElementById('resultsContainer');
const registerBtn = document.getElementById('registerBtn');
const registerModal = document.getElementById('registerModal');
const placeModal = document.getElementById('placeModal');
const placeDetails = document.getElementById('placeDetails');
const registrationForm = document.getElementById('registrationForm');

// Booking data storage
let bookingHistory = JSON.parse(localStorage.getItem('bookingHistory')) || [];

// Initialize Event Listeners
function initializeEventListeners() {
    // Navigation Event Listeners
    popularPlacesLink.addEventListener('click', function(e) {
        e.preventDefault();
        showSection('popular');
        setActiveNav(this);
    });

    travelOutsideLink.addEventListener('click', function(e) {
        e.preventDefault();
        showSection('travel');
        setActiveNav(this);
    });

    onlinePackagesLink.addEventListener('click', function(e) {
        e.preventDefault();
        showSection('packages');
        setActiveNav(this);
    });

    bookingHistoryLink.addEventListener('click', function(e) {
        e.preventDefault();
        showBookingHistory();
        setActiveNav(this);
    });

    // Place Click Handlers
    document.querySelectorAll('.exclusive-item, .trending-place').forEach(item => {
        item.addEventListener('click', function() {
            const placeId = this.getAttribute('data-place');
            showPlaceDetails(placeId);
        });
    });

    // Package Click Handlers
    document.querySelectorAll('.package-btn').forEach(button => {
        button.addEventListener('click', function() {
            const packageId = this.closest('.package-item').getAttribute('data-package');
            bookPackage(packageId);
        });
    });

    // Search Form Submission
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleSearch();
    });

    // Register Button Click
    registerBtn.addEventListener('click', function(e) {
        e.preventDefault();
        registerModal.style.display = 'block';
    });

    // Registration Form Submission
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleRegistration();
    });

    // Close Modal Functions
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });

    // Set minimum dates for check-in and check-out
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('checkinInput').min = today;

    document.getElementById('checkinInput').addEventListener('change', function() {
        document.getElementById('checkoutInput').min = this.value;
    });

    // CTA Button Handler
    document.querySelector('.cta-btn').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Learn more about how you can earn by sharing your space with Tr Travel!');
    });

    // Start Making Money Button Handler
    document.querySelector('.start-btn').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Starting your journey to earn with Tr Travel! Our team will contact you soon.');
    });
}

// Show Section Function
function showSection(section) {
    // Hide all sections
    const sections = [
        popularPlacesSection,
        travelOutsideSection,
        onlinePackagesSection,
        searchResults,
        document.getElementById('printSection'),
        document.getElementById('bookingHistorySection')
    ];

    sections.forEach(section => {
        if (section) section.style.display = 'none';
    });

    // Show selected section
    switch(section) {
        case 'popular':
            popularPlacesSection.style.display = 'block';
            popularPlacesSection.classList.add('section-transition');
            break;
        case 'travel':
            travelOutsideSection.style.display = 'block';
            travelOutsideSection.classList.add('section-transition');
            break;
        case 'packages':
            onlinePackagesSection.style.display = 'block';
            onlinePackagesSection.classList.add('section-transition');
            break;
    }

    // Scroll to section
    document.querySelector('.container').scrollIntoView({ behavior: 'smooth' });
}

// Set Active Navigation
function setActiveNav(clickedElement) {
    // Remove active class from all nav links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });

    // Add active class to clicked element
    clickedElement.classList.add('active');
}

// Show Place Details Function
function showPlaceDetails(placeId) {
    const place = placeData[placeId];

    if (!place) {
        alert('Place details not available');
        return;
    }

    placeDetails.innerHTML = `
        <img src="${place.image}" alt="${place.name}" onerror="this.src='https://via.placeholder.com/600x300/4A90E2/FFFFFF?text=${encodeURIComponent(place.name)}'">
        <div class="place-info">
            <h2>${place.name}</h2>
            <p>${place.description}</p>

            <div class="place-details-grid">
                <div class="detail-item">
                    <strong>Best Time to Visit:</strong>
                    <span>${place.bestTime}</span>
                </div>
                <div class="detail-item">
                    <strong>Recommended Duration:</strong>
                    <span>${place.duration}</span>
                </div>
                <div class="detail-item">
                    <strong>Visa Information:</strong>
                    <span>${place.visa}</span>
                </div>
            </div>

            <h3>Top Attractions</h3>
            <div class="place-highlights">
                ${place.highlights.map(highlight => `<span class="highlight">${highlight}</span>`).join('')}
            </div>

            <div class="price">${place.price}</div>
            <button class="book-btn" onclick="bookDestination('${place.name}')">Book This Destination</button>
        </div>
    `;

    placeModal.style.display = 'block';
}

// Book Package Function
function bookPackage(packageId) {
    const packageNames = {
        'honeymoon': 'Romantic Honeymoon Package',
        'family': 'Family Vacation Package',
        'adventure': 'Adventure Tour Package'
    };

    const packagePrices = {
        'honeymoon': '$1,200',
        'family': '$800',
        'adventure': '$950'
    };

    const bookingData = {
        type: 'package',
        packageName: packageNames[packageId],
        price: packagePrices[packageId],
        duration: packageId === 'honeymoon' ? '7 Days & 6 Nights' :
                 packageId === 'family' ? '5 Days & 4 Nights' : '6 Days & 5 Nights',
        status: 'pending'
    };

    const bookingId = storeBooking(bookingData);

    alert(`📦 Package Customization Request!\n\nRequest ID: TR${bookingId}\nPackage: ${packageNames[packageId]}\nStatus: ⏳ Pending Customization\n\nOur package expert will contact you to customize this package according to your preferences!`);

    showPrintSection(bookingId);
}

// Book Destination Function
function bookDestination(destinationName) {
    const bookingData = {
        type: 'destination',
        destinationName: destinationName,
        status: 'pending',
        price: 'Custom Quote - Pending',
        expertContacted: false
    };

    const bookingId = storeBooking(bookingData);

    alert(`🌍 Destination Booking Request Submitted!\n\nRequest ID: TR${bookingId}\nDestination: ${destinationName}\nStatus: ⏳ Pending Quote\n\nOur travel experts will contact you within 2 hours with a customized quote and itinerary!`);

    showPrintSection(bookingId);
    placeModal.style.display = 'none';
}

// Handle Search Function
function handleSearch() {
    const location = document.getElementById('locationInput').value.toLowerCase().trim();
    const checkin = document.getElementById('checkinInput').value;
    const checkout = document.getElementById('checkoutInput').value;
    const guests = document.getElementById('guestInput').value;

    if (!location) {
        alert('Please enter a location to search');
        return;
    }

    if (!checkin || !checkout) {
        alert('Please select both check-in and check-out dates');
        return;
    }

    // Show search results section
    searchResults.style.display = 'block';

    // Hide other sections
    document.getElementById('popularPlacesSection').style.display = 'none';
    document.getElementById('travelOutsideSection').style.display = 'none';
    document.getElementById('onlinePackagesSection').style.display = 'none';

    // Scroll to results
    searchResults.scrollIntoView({ behavior: 'smooth' });

    // Display results
    displaySearchResults(location, checkin, checkout, guests);
}

// Display Search Results Function
function displaySearchResults(location, checkin, checkout, guests) {
    const locationLower = location.toLowerCase();
    const hasExactMatch = travelData[locationLower];
    const results = hasExactMatch ? travelData[locationLower] : generateDynamicResults(location);

    // Clear previous results
    resultsContainer.innerHTML = '';

    // Create results heading with search details
    const resultsHeading = document.createElement('div');
    resultsHeading.className = 'search-results-header';

    if (hasExactMatch) {
        resultsHeading.innerHTML = `
            <h3>🏨 Best Properties in ${location.charAt(0).toUpperCase() + location.slice(1)}</h3>
            <div class="search-details">
                <span><strong>Check-in:</strong> ${checkin}</span>
                <span><strong>Check-out:</strong> ${checkout}</span>
                <span><strong>Guests:</strong> ${guests}</span>
            </div>
            <p style="margin-top: 10px; color: #28a745;">✅ Showing specific properties for ${location}</p>
        `;
    } else {
        resultsHeading.innerHTML = `
            <h3>🏨 Properties in ${location.charAt(0).toUpperCase() + location.slice(1)}</h3>
            <div class="search-details">
                <span><strong>Check-in:</strong> ${checkin}</span>
                <span><strong>Check-out:</strong> ${checkout}</span>
                <span><strong>Guests:</strong> ${guests}</span>
            </div>
            <p style="margin-top: 10px; color: #ffc107;">✨ Discovering ${location}? Here are excellent options for your stay!</p>
        `;
    }

    resultsContainer.appendChild(resultsHeading);

    // Display each result
    results.forEach(property => {
        const resultCard = document.createElement('div');
        resultCard.className = 'result-card';

        resultCard.innerHTML = `
            <img src="${property.image}" alt="${property.name}" onerror="this.src='https://via.placeholder.com/300x200/667eea/FFFFFF?text=Property+Image'">
            <div class="result-info">
                <h3>${property.name}</h3>
                <p>${property.description}</p>
                <div class="property-details">
                    <span class="rating">⭐ ${property.rating}</span>
                    <span class="result-price">${property.price}</span>
                </div>
                <div class="amenities">
                    ${property.amenities.map(amenity => `<span class="amenity">${amenity}</span>`).join('')}
                </div>
                <div class="booking-dates">
                    <small>Available for your dates: ${checkin} to ${checkout}</small>
                </div>
                <button class="book-btn" onclick="bookProperty('${property.name.replace(/'/g, "\\'")}', '${checkin}', '${checkout}', ${guests})">
                    Book Now for ${guests} Guest${guests > 1 ? 's' : ''}
                </button>
            </div>
        `;

        resultsContainer.appendChild(resultCard);
    });

    // Add contact information for custom requests
    if (!hasExactMatch) {
        const contactSection = document.createElement('div');
        contactSection.className = 'contact-section';
        contactSection.innerHTML = `
            <div class="contact-info">
                <h4>Want more specific options in ${location}?</h4>
                <p>Our local experts can find the perfect accommodation matching your preferences!</p>
                <button class="contact-btn" onclick="contactExpert('${location}')">
                    <i class="fa-solid fa-headset"></i> Contact ${location} Expert
                </button>
            </div>
        `;
        resultsContainer.appendChild(contactSection);
    }
}

// Generate Dynamic Results Function
function generateDynamicResults(location) {
    const locationName = location.charAt(0).toUpperCase() + location.slice(1);

    return [
        {
            name: `${locationName} Luxury Sky Residence`,
            image: "images/luxury-residence.jpg",
            description: `Premium residence with panoramic ${locationName} skyline views`,
            price: "$250-$400/night",
            rating: "4.8",
            amenities: ["WiFi", "Gourmet Kitchen", "City View", "Infinity Pool", "Gym", "Concierge"]
        },
        {
            name: `${locationName} City Center Apartment`,
            image: "images/city-center.jpg",
            description: `Comfortable apartment in the heart of ${locationName}`,
            price: "$120-$200/night",
            rating: "4.5",
            amenities: ["WiFi", "Full Kitchen", "Central Location", "Balcony", "Modern", "Convenient"]
        },
        {
            name: `${locationName} Cozy Studio`,
            image: "images/cozy-studio.jpg",
            description: `Affordable and cozy studio in ${locationName}`,
            price: "$80-$150/night",
            rating: "4.2",
            amenities: ["WiFi", "Kitchenette", "Comfortable", "Good Location", "Value", "Essential Amenities"]
        }
    ];
}

// Contact Expert Function
function contactExpert(location) {
    alert(`Our ${location} travel expert will contact you within 2 hours!\n\nWe'll help you find:\n• Perfect accommodations\n• Local experiences\n• Transportation options\n• Custom itinerary\n\nEmail: experts@trtravel.com\nPhone: +1 (555) 123-4567`);
}

// Book Property Function
function bookProperty(propertyName, checkin, checkout, guests) {
    // Calculate dynamic pricing based on guests and duration
    const basePrice = 120;
    const guestSurcharge = (guests - 1) * 20;
    const date1 = new Date(checkin);
    const date2 = new Date(checkout);
    const nights = Math.ceil((date2 - date1) / (1000 * 60 * 60 * 24));
    const totalPrice = (basePrice + guestSurcharge) * nights;

    const bookingData = {
        type: 'property',
        propertyName: propertyName,
        checkin: checkin,
        checkout: checkout,
        guests: guests,
        nights: nights,
        price: `$${totalPrice}`,
        status: 'confirmed'
    };

    const bookingId = storeBooking(bookingData);

    alert(`🏨 Booking Confirmed!\n\nProperty: ${propertyName}\nCheck-in: ${checkin}\nCheck-out: ${checkout}\nGuests: ${guests}\nDuration: ${nights} nights\nTotal: $${totalPrice}\nBooking ID: TR${bookingId}\n\nThank you for choosing Tr Travel!`);

    showPrintSection(bookingId);
}

// Handle Registration Function
function handleRegistration() {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;

    if (!fullName || !email) {
        alert('Please fill in all required fields');
        return;
    }

    alert(`Thank you for registering, ${fullName}!\n\nA confirmation email has been sent to ${email}`);
    registerModal.style.display = 'none';
    registrationForm.reset();
}

// Store booking function
function storeBooking(bookingData) {
    const booking = {
        id: Date.now(),
        timestamp: new Date().toLocaleString(),
        status: 'pending',
        ...bookingData
    };

    // Property bookings are confirmed immediately, others are pending
    if (booking.type === 'property') {
        booking.status = 'confirmed';
    }

    // Calculate nights for property bookings
    if (booking.type === 'property' && booking.checkin && booking.checkout) {
        const date1 = new Date(booking.checkin);
        const date2 = new Date(booking.checkout);
        booking.nights = Math.ceil((date2 - date1) / (1000 * 60 * 60 * 24));
    }

    // For destination bookings, mark expert contact
    if (booking.type === 'destination') {
        booking.expertContacted = false;
    }

    bookingHistory.unshift(booking);
    localStorage.setItem('bookingHistory', JSON.stringify(bookingHistory));
    return booking.id;
}

// Show Print Section Function
function showPrintSection(bookingId) {
    const booking = bookingHistory.find(b => b.id === bookingId);

    if (!booking) {
        alert('Booking not found!');
        return;
    }

    const printSection = document.getElementById('printSection');
    const printContent = document.getElementById('printContent');

    // Generate print content based on booking type
    let content = '';

    if (booking.type === 'property') {
        content = generatePropertyPrintContent(booking);
    } else if (booking.type === 'destination') {
        content = generateDestinationPrintContent(booking);
    } else if (booking.type === 'package') {
        content = generatePackagePrintContent(booking);
    }

    printContent.innerHTML = content;

    // Hide other sections
    document.getElementById('popularPlacesSection').style.display = 'none';
    document.getElementById('travelOutsideSection').style.display = 'none';
    document.getElementById('onlinePackagesSection').style.display = 'none';
    document.getElementById('searchResults').style.display = 'none';
    document.getElementById('bookingHistorySection').style.display = 'none';

    printSection.style.display = 'block';

    // Scroll to print section
    printSection.scrollIntoView({ behavior: 'smooth' });
}

// Generate Property Print Content
function generatePropertyPrintContent(booking) {
    return `
        <div class="print-content">
            <div class="booking-details">
                <h3>Property Booking Confirmation</h3>
                <div class="detail-row">
                    <span class="detail-label">Booking ID:</span>
                    <span class="detail-value">TR${booking.id}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Booking Date:</span>
                    <span class="detail-value">${booking.timestamp}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Property Name:</span>
                    <span class="detail-value">${booking.propertyName}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Check-in Date:</span>
                    <span class="detail-value">${booking.checkin}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Check-out Date:</span>
                    <span class="detail-value">${booking.checkout}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Number of Guests:</span>
                    <span class="detail-value">${booking.guests}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Number of Nights:</span>
                    <span class="detail-value">${booking.nights}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Booking Status:</span>
                    <span class="detail-value" style="color: green; font-weight: bold;">${booking.status.toUpperCase()}</span>
                </div>
            </div>

            <div class="price-summary">
                <h3>Price Summary</h3>
                <div class="price-item">
                    <span>Accommodation (${booking.nights} nights)</span>
                    <span>${booking.price}</span>
                </div>
                <div class="price-item">
                    <span>Service Fee</span>
                    <span>$15</span>
                </div>
                <div class="price-item">
                    <span>Taxes</span>
                    <span>$8</span>
                </div>
                <div class="price-item total-price">
                    <span>Total Amount</span>
                    <span>${booking.price}</span>
                </div>
            </div>

            <div class="terms-conditions">
                <h4>Terms & Conditions:</h4>
                <ul>
                    <li>Check-in time: 2:00 PM | Check-out time: 11:00 AM</li>
                    <li>Cancellation policy: Free cancellation up to 48 hours before check-in</li>
                    <li>No smoking in the property</li>
                    <li>Security deposit may be required</li>
                    <li>Contact: support@trtravel.com | +1 (555) 123-4567</li>
                </ul>
            </div>
        </div>
    `;
}

// Generate Destination Print Content
function generateDestinationPrintContent(booking) {
    const statusColor = booking.status === 'pending' ? 'orange' : 'green';

    return `
        <div class="print-content">
            <div class="booking-details">
                <h3>Destination Booking ${booking.status === 'pending' ? 'Request' : 'Confirmation'}</h3>
                <div class="detail-row">
                    <span class="detail-label">${booking.status === 'pending' ? 'Request' : 'Booking'} ID:</span>
                    <span class="detail-value">TR${booking.id}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">${booking.status === 'pending' ? 'Request' : 'Booking'} Date:</span>
                    <span class="detail-value">${booking.timestamp}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Destination:</span>
                    <span class="detail-value">${booking.destinationName}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">${booking.status === 'pending' ? 'Request' : 'Booking'} Status:</span>
                    <span class="detail-value" style="color: ${statusColor}; font-weight: bold;">${booking.status.toUpperCase()}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Estimated Price:</span>
                    <span class="detail-value">${booking.price}</span>
                </div>
            </div>

            <div class="terms-conditions">
                <h4>${booking.status === 'pending' ? 'Next Steps:' : 'Services Included:'}</h4>
                <ul>
                    ${booking.status === 'pending' ? `
                    <li>Our travel expert will contact you within 24 hours</li>
                    <li>We'll create a customized itinerary based on your preferences</li>
                    <li>Final pricing will be provided after itinerary confirmation</li>
                    ` : `
                    <li>Customized itinerary planning</li>
                    <li>Hotel bookings and arrangements</li>
                    <li>Flight reservations</li>
                    <li>Visa assistance</li>
                    <li>Travel insurance options</li>
                    <li>24/7 customer support during travel</li>
                    `}
                    <li>Contact: ${booking.status === 'pending' ? 'experts@trtravel.com' : 'support@trtravel.com'} | +1 (555) 123-4567</li>
                </ul>
            </div>
        </div>
    `;
}

// Generate Package Print Content
function generatePackagePrintContent(booking) {
    const statusColor = booking.status === 'pending' ? 'orange' : 'green';

    return `
        <div class="print-content">
            <div class="booking-details">
                <h3>Package Booking ${booking.status === 'pending' ? 'Request' : 'Confirmation'}</h3>
                <div class="detail-row">
                    <span class="detail-label">${booking.status === 'pending' ? 'Request' : 'Booking'} ID:</span>
                    <span class="detail-value">TR${booking.id}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">${booking.status === 'pending' ? 'Request' : 'Booking'} Date:</span>
                    <span class="detail-value">${booking.timestamp}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Package Name:</span>
                    <span class="detail-value">${booking.packageName}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Duration:</span>
                    <span class="detail-value">${booking.duration}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">${booking.status === 'pending' ? 'Request' : 'Booking'} Status:</span>
                    <span class="detail-value" style="color: ${statusColor}; font-weight: bold;">${booking.status.toUpperCase()}</span>
                </div>
            </div>

            <div class="price-summary">
                <h3>Package Price Summary</h3>
                <div class="price-item">
                    <span>Package Price</span>
                    <span>${booking.price}</span>
                </div>
                <div class="price-item">
                    <span>Service Fee</span>
                    <span>$25</span>
                </div>
                <div class="price-item">
                    <span>Taxes</span>
                    <span>$12</span>
                </div>
                <div class="price-item total-price">
                    <span>Total Amount</span>
                    <span>${booking.price}</span>
                </div>
            </div>

            <div class="terms-conditions">
                <h4>Package Details:</h4>
                <ul>
                    <li>${booking.status === 'pending' ? 'Our travel expert will contact you to customize this package' : 'Package successfully confirmed and customized'}</li>
                    <li>All inclusions and exclusions will be detailed in final itinerary</li>
                    <li>Payment schedule: 30% advance, 70% before travel</li>
                    <li>Cancellation policy varies by package type</li>
                    <li>Contact: packages@trtravel.com | +1 (555) 123-4567</li>
                </ul>
            </div>
        </div>
    `;
}

// Generate PDF Function
function generatePDF() {
    window.print();
}

// Booking History Functions
function showBookingHistory() {
    // Hide all other sections
    document.getElementById('popularPlacesSection').style.display = 'none';
    document.getElementById('travelOutsideSection').style.display = 'none';
    document.getElementById('onlinePackagesSection').style.display = 'none';
    document.getElementById('searchResults').style.display = 'none';
    document.getElementById('printSection').style.display = 'none';

    // Show booking history section
    const historySection = document.getElementById('bookingHistorySection');
    historySection.style.display = 'block';
    historySection.classList.add('section-transition');

    // Load and display booking history
    displayBookingHistory();

    // Scroll to history section
    historySection.scrollIntoView({ behavior: 'smooth' });
}

function displayBookingHistory() {
    const historyContainer = document.getElementById('bookingHistoryContainer');

    if (bookingHistory.length === 0) {
        historyContainer.innerHTML = `
            <div class="no-bookings">
                <i class="fa-solid fa-calendar-xmark"></i>
                <h3>No Bookings Yet</h3>
                <p>You haven't made any bookings yet. Start exploring and book your perfect stay!</p>
                <button onclick="showSection('popular')" class="cta-btn" style="margin-top: 20px;">
                    Explore Destinations
                </button>
            </div>
        `;
        return;
    }

    let historyHTML = '';

    // Sort bookings: pending first, then by date (newest first)
    const sortedBookings = [...bookingHistory].sort((a, b) => {
        if (a.status === 'pending' && b.status !== 'pending') return -1;
        if (a.status !== 'pending' && b.status === 'pending') return 1;
        return b.id - a.id;
    });

    sortedBookings.forEach(booking => {
        const statusClass = booking.status === 'confirmed' ? 'status-confirmed' :
                           booking.status === 'pending' ? 'status-pending' :
                           'status-cancelled';
        const statusText = booking.status.toUpperCase();

        let detailsHTML = '';

        if (booking.type === 'property') {
            detailsHTML = `
                <div class="booking-details-grid">
                    <div class="booking-detail">
                        <span class="booking-label">Property</span>
                        <span class="booking-value">${booking.propertyName}</span>
                    </div>
                    <div class="booking-detail">
                        <span class="booking-label">Check-in</span>
                        <span class="booking-value">${booking.checkin}</span>
                    </div>
                    <div class="booking-detail">
                        <span class="booking-label">Check-out</span>
                        <span class="booking-value">${booking.checkout}</span>
                    </div>
                    <div class="booking-detail">
                        <span class="booking-label">Guests</span>
                        <span class="booking-value">${booking.guests}</span>
                    </div>
                    <div class="booking-detail">
                        <span class="booking-label">Nights</span>
                        <span class="booking-value">${booking.nights || 'N/A'}</span>
                    </div>
                    <div class="booking-detail">
                        <span class="booking-label">Total Price</span>
                        <span class="booking-value" style="color: #ff6b6b;">${booking.price}</span>
                    </div>
                </div>
            `;
        } else if (booking.type === 'destination') {
            detailsHTML = `
                <div class="booking-details-grid">
                    <div class="booking-detail">
                        <span class="booking-label">Destination</span>
                        <span class="booking-value">${booking.destinationName}</span>
                    </div>
                    <div class="booking-detail">
                        <span class="booking-label">Service</span>
                        <span class="booking-value">Custom Travel Package</span>
                    </div>
                    <div class="booking-detail">
                        <span class="booking-label">Estimated Price</span>
                        <span class="booking-value">${booking.price}</span>
                    </div>
                    ${booking.expertContacted ? `
                    <div class="booking-detail">
                        <span class="booking-label">Expert Contact</span>
                        <span class="booking-value" style="color: #28a745;">
                            <i class="fa-solid fa-check"></i> Contacted
                        </span>
                    </div>
                    ` : ''}
                </div>
            `;
        } else if (booking.type === 'package') {
            detailsHTML = `
                <div class="booking-details-grid">
                    <div class="booking-detail">
                        <span class="booking-label">Package</span>
                        <span class="booking-value">${booking.packageName}</span>
                    </div>
                    <div class="booking-detail">
                        <span class="booking-label">Duration</span>
                        <span class="booking-value">${booking.duration}</span>
                    </div>
                    <div class="booking-detail">
                        <span class="booking-label">Total Price</span>
                        <span class="booking-value" style="color: #ff6b6b;">${booking.price}</span>
                    </div>
                </div>
            `;
        }

        // Action buttons based on status
        let actionButtons = '';

        if (booking.status === 'pending') {
            actionButtons = `
                <div class="booking-actions">
                    <button class="action-btn accept-btn" onclick="acceptBooking(${booking.id})">
                        <i class="fa-solid fa-check"></i> Accept Quote
                    </button>
                    <button class="action-btn reject-btn" onclick="rejectBooking(${booking.id})">
                        <i class="fa-solid fa-times"></i> Reject Quote
                    </button>
                    <button class="action-btn details-btn" onclick="viewBookingDetails(${booking.id})">
                        <i class="fa-solid fa-eye"></i> View Details
                    </button>
                    <button class="action-btn contact-btn" onclick="contactAboutBooking(${booking.id})">
                        <i class="fa-solid fa-headset"></i> Contact Support
                    </button>
                </div>
            `;
        } else if (booking.status === 'confirmed') {
            actionButtons = `
                <div class="booking-actions">
                    <button class="action-btn print-btn" onclick="showPrintSection(${booking.id})">
                        <i class="fa-solid fa-print"></i> Print Details
                    </button>
                    <button class="action-btn details-btn" onclick="viewBookingDetails(${booking.id})">
                        <i class="fa-solid fa-eye"></i> View Details
                    </button>
                    <button class="action-btn cancel-btn" onclick="cancelBooking(${booking.id})">
                        <i class="fa-solid fa-times"></i> Cancel Booking
                    </button>
                </div>
            `;
        } else if (booking.status === 'cancelled') {
            actionButtons = `
                <div class="booking-actions">
                    <button class="action-btn details-btn" onclick="viewBookingDetails(${booking.id})">
                        <i class="fa-solid fa-eye"></i> View Details
                    </button>
                    <button class="action-btn delete-btn" onclick="deleteBooking(${booking.id})">
                        <i class="fa-solid fa-trash"></i> Delete
                    </button>
                </div>
            `;
        }

        historyHTML += `
            <div class="booking-card ${booking.status === 'pending' ? 'pending-booking' : ''}">
                <div class="booking-header">
                    <div>
                        <div class="booking-id">Booking ID: TR${booking.id}</div>
                        <div style="font-size: 0.9rem; color: #666; margin-top: 5px;">
                            Booked on: ${booking.timestamp}
                        </div>
                        ${booking.updatedAt ? `
                        <div style="font-size: 0.8rem; color: #888; margin-top: 2px;">
                            Updated: ${booking.updatedAt}
                        </div>
                        ` : ''}
                    </div>
                    <span class="booking-status ${statusClass}">${statusText}</span>
                </div>

                ${detailsHTML}

                ${booking.status === 'pending' ? `
                <div class="pending-notice">
                    <i class="fa-solid fa-clock"></i>
                    <strong>Action Required:</strong> Please review and accept the quote to confirm your booking.
                </div>
                ` : ''}

                ${actionButtons}
            </div>
        `;
    });

    historyContainer.innerHTML = historyHTML;
}

function viewBookingDetails(bookingId) {
    const booking = bookingHistory.find(b => b.id === bookingId);

    if (!booking) {
        alert('Booking not found!');
        return;
    }

    let message = `📋 Booking Details\n\n`;
    message += `Booking ID: TR${booking.id}\n`;
    message += `Booking Date: ${booking.timestamp}\n`;
    message += `Status: ${booking.status.toUpperCase()}\n\n`;

    if (booking.type === 'property') {
        message += `🏨 Property Booking\n`;
        message += `Property: ${booking.propertyName}\n`;
        message += `Check-in: ${booking.checkin}\n`;
        message += `Check-out: ${booking.checkout}\n`;
        message += `Guests: ${booking.guests}\n`;
        message += `Nights: ${booking.nights || 'N/A'}\n`;
        message += `Total: ${booking.price}\n`;
    } else if (booking.type === 'destination') {
        message += `🌍 Destination Request\n`;
        message += `Destination: ${booking.destinationName}\n`;
        message += `Service: Custom Travel Package\n`;
        message += `Estimated: ${booking.price}\n`;
        message += `\nOur travel expert will contact you soon!\n`;
    } else if (booking.type === 'package') {
        message += `📦 Package Booking\n`;
        message += `Package: ${booking.packageName}\n`;
        message += `Duration: ${booking.duration}\n`;
        message += `Total: ${booking.price}\n`;
    }

    message += `\nNeed help? Contact: support@trtravel.com`;

    alert(message);
}

// Accept Booking Function
function acceptBooking(bookingId) {
    const booking = bookingHistory.find(b => b.id === bookingId);

    if (!booking) {
        alert('Booking not found!');
        return;
    }

    if (!confirm(`Accept this booking?\n\nBooking: ${getBookingTitle(booking)}\nPrice: ${booking.price}\n\nOnce accepted, our team will proceed with the arrangements.`)) {
        return;
    }

    const bookingIndex = bookingHistory.findIndex(b => b.id === bookingId);

    if (bookingIndex !== -1) {
        bookingHistory[bookingIndex].status = 'confirmed';
        bookingHistory[bookingIndex].updatedAt = new Date().toLocaleString();
        bookingHistory[bookingIndex].acceptedAt = new Date().toLocaleString();

        localStorage.setItem('bookingHistory', JSON.stringify(bookingHistory));

        alert(`✅ Booking Accepted!\n\nYour booking for ${getBookingTitle(booking)} has been confirmed.\n\nOur team is now processing your request. You'll receive a confirmation email shortly.`);

        displayBookingHistory();
        showPrintSection(bookingId);
    }
}

// Reject Booking Function
function rejectBooking(bookingId) {
    const booking = bookingHistory.find(b => b.id === bookingId);

    if (!booking) {
        alert('Booking not found!');
        return;
    }

    const reason = prompt(`Please specify why you're rejecting this quote for ${getBookingTitle(booking)}:\n\n1. Price too high\n2. Dates not suitable\n3. Found better option\n4. Other reason\n\nEnter your reason:`);

    if (reason === null) return;

    if (!reason.trim()) {
        alert('Please provide a reason for rejection.');
        return;
    }

    if (!confirm(`Reject this booking quote?\n\nReason: ${reason}\n\nThis action cannot be undone.`)) {
        return;
    }

    const bookingIndex = bookingHistory.findIndex(b => b.id === bookingId);

    if (bookingIndex !== -1) {
        bookingHistory[bookingIndex].status = 'cancelled';
        bookingHistory[bookingIndex].updatedAt = new Date().toLocaleString();
        bookingHistory[bookingIndex].rejectionReason = reason;

        localStorage.setItem('bookingHistory', JSON.stringify(bookingHistory));

        alert(`❌ Booking Quote Rejected\n\nWe've noted your feedback. Our team may contact you with alternative options.\n\nReason: ${reason}`);

        displayBookingHistory();
    }
}

// Contact About Booking Function
function contactAboutBooking(bookingId) {
    const booking = bookingHistory.find(b => b.id === bookingId);

    if (!booking) {
        alert('Booking not found!');
        return;
    }

    alert(`📞 Contact Our Support Team\n\nBooking: ${getBookingTitle(booking)}\nID: TR${booking.id}\n\nYou can:\n\n📧 Email: support@trtravel.com\n📞 Phone: +1 (555) 123-4567\n💬 Live Chat: Available on website\n\nReference your Booking ID when contacting us.`);
}

// Delete Booking Function
function deleteBooking(bookingId) {
    if (!confirm('Are you sure you want to delete this booking from your history?\n\nThis action cannot be undone.')) {
        return;
    }

    const bookingIndex = bookingHistory.findIndex(b => b.id === bookingId);

    if (bookingIndex !== -1) {
        bookingHistory.splice(bookingIndex, 1);
        localStorage.setItem('bookingHistory', JSON.stringify(bookingHistory));

        alert('Booking deleted from history!');
        displayBookingHistory();
    }
}

// Cancel Booking Function
function cancelBooking(bookingId) {
    const booking = bookingHistory.find(b => b.id === bookingId);

    if (!booking) {
        alert('Booking not found!');
        return;
    }

    const cancellationReason = prompt(`Please specify why you're cancelling ${getBookingTitle(booking)}:\n\n1. Change of plans\n2. Found better option\n3. Financial reasons\n4. Other\n\nEnter your reason:`);

    if (cancellationReason === null) return;

    if (!cancellationReason.trim()) {
        alert('Please provide a cancellation reason.');
        return;
    }

    if (!confirm(`Cancel this booking?\n\nBooking: ${getBookingTitle(booking)}\nReason: ${cancellationReason}\n\nCancellation fees may apply based on our policy.`)) {
        return;
    }

    const bookingIndex = bookingHistory.findIndex(b => b.id === bookingId);

    if (bookingIndex !== -1) {
        bookingHistory[bookingIndex].status = 'cancelled';
        bookingHistory[bookingIndex].updatedAt = new Date().toLocaleString();
        bookingHistory[bookingIndex].cancellationReason = cancellationReason;

        localStorage.setItem('bookingHistory', JSON.stringify(bookingHistory));

        alert('Booking cancelled successfully!\n\nOur team will process your cancellation and contact you regarding any applicable fees.');
        displayBookingHistory();
    }
}

function clearAllBookings() {
    if (bookingHistory.length === 0) {
        alert('No bookings to clear!');
        return;
    }

    if (!confirm('Are you sure you want to clear ALL booking history?\n\nThis action cannot be undone.')) {
        return;
    }

    bookingHistory = [];
    localStorage.setItem('bookingHistory', JSON.stringify(bookingHistory));

    alert('All booking history cleared!');
    displayBookingHistory();
}

// Helper function to get booking title
function getBookingTitle(booking) {
    if (booking.type === 'property') return booking.propertyName;
    if (booking.type === 'destination') return booking.destinationName;
    if (booking.type === 'package') return booking.packageName;
    return 'Booking';
}

// Initialize page
window.addEventListener('load', function() {
    initializeEventListeners();

    // Set default dates
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('checkinInput').value = tomorrow.toISOString().split('T')[0];

    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 3);
    document.getElementById('checkoutInput').value = nextWeek.toISOString().split('T')[0];

    // Set Popular Places as default active section
    setActiveNav(popularPlacesLink);

    console.log('Tr Travel website initialized successfully!');
});