let map;

function initializeMap() {
    mapboxgl.accessToken =
        "pk.eyJ1IjoiZmhtaWFsZmk3OSIsImEiOiJja3ZoazI2bm4yaXR6Mm9ubzQ3aHVsMWdxIn0.JPnp5fiT7CQWK12NEp1aRg";

    map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [116.911, 2.72594], // Koordinat pusat Kalimantan
        zoom: 6,
    });

    const provinsiData = {
        "Kalimantan Barat": {
            jumlahPenduduk: "5.695,5 ribu",
            luasWilayah: "147.037,04 km²",
            tingkatPendidikan: "55,58%",
            kepadatanPenduduk: "39 km²",
            schools: [
                {
                    name: "SMA Negeri 1 Singkawang",
                    coords: [109.0113515, 0.9029468],
                },
                {
                    name: "SMA Negeri 1 Mempawah Hilir",
                    coords: [108.951188, 0.3625648],
                },
            ],
        },
        "Kalimantan Tengah": {
            jumlahPenduduk: "2.809,7 ribu",
            luasWilayah: "153.443,91 km²",
            tingkatPendidikan: "63,93%",
            kepadatanPenduduk: "18 km²",
            schools: [
                {
                    name: "SMAN 1 Katingan Tengah",
                    coords: [113.0988058, -1.4617954],
                },
                {
                    name: "SMA Negeri 1 Palangkaraya",
                    coords: [113.9254802, -2.2100824],
                },
            ],
        },
    };

    map.on("load", async () => {
        try {
            // Daftar file GeoJSON dan warna masing-masing provinsi
            const provinsiFiles = [
                {
                    name: "Kalimantan Utara",
                    file: "/geojson/kalimantan_utara.geojson",
                    color: "#f28cb1",
                },
                {
                    name: "Kalimantan Selatan",
                    file: "/geojson/kalimantan_selatan.geojson",
                    color: "#74c476",
                },
                {
                    name: "Kalimantan Timur",
                    file: "/geojson/kalimantan_timur.geojson",
                    color: "#6baed6",
                },
                {
                    name: "Kalimantan Barat",
                    file: "/geojson/kalimantan_barat.geojson",
                    color: "#fd8d3c",
                },
                {
                    name: "Kalimantan Tengah",
                    file: "/geojson/kalimantan_tengah.geojson",
                    color: "#9e9ac8",
                },
            ];

            for (const provinsi of provinsiFiles) {
                const response = await fetch(provinsi.file);
                const data = await response.json();

                map.addSource(provinsi.name, {
                    type: "geojson",
                    data: data,
                });

                map.addLayer({
                    id: `${provinsi.name}-fill`,
                    type: "fill",
                    source: provinsi.name,
                    paint: {
                        "fill-color": provinsi.color,
                        "fill-opacity": 0.5,
                    },
                });

                map.addLayer({
                    id: `${provinsi.name}-line`,
                    type: "line",
                    source: provinsi.name,
                    paint: {
                        "line-color": "#000",
                        "line-width": 1,
                    },
                });

                map.on("click", `${provinsi.name}-fill`, (e) => {
                    const info = provinsiData[provinsi.name];

                    // Hapus marker yang ada sebelumnya
                    const existingMarkers =
                        document.getElementsByClassName("mapboxgl-marker");
                    while (existingMarkers.length > 0) {
                        existingMarkers[0].remove();
                    }

                    // Tampilkan marker sekolah di area provinsi yang diklik
                    if (info && info.schools) {
                        info.schools.forEach((school) => {
                            new mapboxgl.Marker()
                                .setLngLat(school.coords)
                                .setPopup(
                                    new mapboxgl.Popup().setHTML(
                                        `<h3>${school.name}</h3><p>${provinsi.name}</p>`
                                    )
                                )
                                .addTo(map);
                        });
                    }

                    // Tampilkan popup info provinsi
                    const popupContent = `
                        <div>
                            <h3>${provinsi.name}</h3>
                            <p><strong>Jumlah Penduduk:</strong> ${info.jumlahPenduduk}</p>
                            <p><strong>Luas Wilayah:</strong> ${info.luasWilayah}</p>
                            <p><strong>Tingkat Pendidikan:</strong> ${info.tingkatPendidikan}</p>
                            <p><strong>Kepadatan Penduduk:</strong> ${info.kepadatanPenduduk}</p>
                        </div>
                    `;

                    new mapboxgl.Popup()
                        .setLngLat(e.lngLat)
                        .setHTML(popupContent)
                        .addTo(map);
                });
            }
        } catch (error) {
            console.error("Gagal memuat file GeoJSON atau marker:", error);
        }
    });
}

initializeMap();
