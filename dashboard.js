document.addEventListener('DOMContentLoaded', function() {
    // Initialize map
    window.initMap = function() {
        // Create a map centered at a location
        const map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 13.0056, lng: 76.1025 }, // Hassan, Karnataka coordinates
            zoom: 12,
            styles: [
                {
                    "featureType": "all",
                    "elementType": "labels.text.fill",
                    "stylers": [{"color": "#7c93a3"},{"lightness": "-10"}]
                },
                {
                    "featureType": "administrative.country",
                    "elementType": "geometry",
                    "stylers": [{"visibility": "on"}]
                },
                {
                    "featureType": "administrative.province",
                    "elementType": "geometry.stroke",
                    "stylers": [{"color": "#a3a3a3"}]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry.fill",
                    "stylers": [{"color": "#f1f5f9"}]
                },
                {
                    "featureType": "landscape.man_made",
                    "elementType": "geometry.stroke",
                    "stylers": [{"color": "#e8e8e8"}]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [{"color": "#c3c3c3"}]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [{"color": "#b7b7b7"}]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry.fill",
                    "stylers": [{"color": "#d3d3d3"}]
                }
            ]
        });

        // Sample bins data with different status levels
        const bins = [
            { lat: 12.995, lng: 76.1, status: "normal", fillLevel: 30 },
            { lat: 13.01, lng: 76.11, status: "warning", fillLevel: 72 },
            { lat: 13.02, lng: 76.09, status: "critical", fillLevel: 95 },
            { lat: 13.005, lng: 76.12, status: "normal", fillLevel: 45 },
            { lat: 13.015, lng: 76.1, status: "warning", fillLevel: 65 },
            { lat: 13.0, lng: 76.105, status: "normal", fillLevel: 28 },
            { lat: 13.01, lng: 76.095, status: "critical", fillLevel: 90 },
            { lat: 12.99, lng: 76.11, status: "warning", fillLevel: 75 }
        ];

        // Add markers for each bin
        bins.forEach(bin => {
            const pinColor = bin.status === "critical" ? "#ef4444" : 
                             bin.status === "warning" ? "#f59e0b" : "#10b981";
            
            const marker = new google.maps.Marker({
                position: { lat: bin.lat, lng: bin.lng },
                map: map,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    fillColor: pinColor,
                    fillOpacity: 0.9,
                    strokeWeight: 2,
                    strokeColor: "#ffffff",
                    scale: 8
                },
                title: `Bin Fill Level: ${bin.fillLevel}%`
            });
            
            // Add info window for each marker
            const infoWindow = new google.maps.InfoWindow({
                content: `
                    <div style="padding: 8px; font-family: 'Inter', sans-serif;">
                        <div style="font-weight: 500; margin-bottom: 4px;">Waste Bin</div>
                        <div style="font-size: 13px; color: #64748b; margin-bottom: 8px;">ID: BIN-${Math.floor(1000 + Math.random() * 9000)}</div>
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                            <div style="width: 10px; height: 10px; border-radius: 50%; background-color: ${pinColor};"></div>
                            <div style="font-size: 13px;">${bin.status.charAt(0).toUpperCase() + bin.status.slice(1)} (${bin.fillLevel}% full)</div>
                        </div>
                        <div style="font-size: 12px; color: #64748b;">Last updated: 10 mins ago</div>
                    </div>
                `
            });
            
            marker.addListener("click", () => {
                infoWindow.open(map, marker);
            });
        });
    };

    // Initialize charts if Chart.js is available
    if (window.Chart) {
        // Fill Level Trends Chart
        const fillLevelCtx = document.getElementById('fillLevelChart');
        if (fillLevelCtx) {
            new Chart(fillLevelCtx, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Average Fill Level %',
                        data: [42, 49, 65, 59, 80, 73, 67],
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true,
                        pointBackgroundColor: '#ffffff',
                        pointBorderColor: '#3b82f6',
                        pointBorderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false
                            }
                        },
                        y: {
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                stepSize: 20
                            }
                        }
                    }
                }
            });
        }

        // Waste Distribution Chart
        const wasteDistributionCtx = document.getElementById('wasteDistributionChart');
        if (wasteDistributionCtx) {
            new Chart(wasteDistributionCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Plastic', 'Paper', 'Metal', 'Glass'],
                    datasets: [{
                        data: [35, 30, 15, 20],
                        backgroundColor: ['#3b82f6', '#64748b', '#10b981', '#f59e0b'],
                        borderWidth: 0,
                        hoverOffset: 4
                    }]
                },
                options: {
                    responsive: true,
                    cutout: '70%',
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
        }
    }
});