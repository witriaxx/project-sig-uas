<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Peta Persebaran Sekolah Kalimantan</title>
    <!-- Mapbox GL CSS -->
    <link href="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css" rel="stylesheet" />
    <!-- Custom CSS -->
    <?php echo app('Illuminate\Foundation\Vite')('resources/css/styles.css'); ?>
    <style>
        #map {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
        }

    </style>
</head>
<body>
    <div class="container">
        <div class="relative" id="map"></div>
    </div>

    <!-- Mapbox GL JS -->
    <script src="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js"></script>
    <!-- Custom JS -->
    <?php echo app('Illuminate\Foundation\Vite')('resources/js/map.js'); ?>
</body>
</html>
<?php /**PATH C:\laragon\www\projectGIS\resources\views/index.blade.php ENDPATH**/ ?>