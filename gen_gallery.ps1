
$publicDir = Join-Path (Get-Location) "public"
$projectsDir = Join-Path $publicDir "projects"

$folders = @(
    "Abaco Luxe Boat House",
    "Carmel Forest to Ocean View",
    "carmel-knolls",
    "carmel-valley-new",
    "Civil Engineering",
    "coastal-restoration",
    "Coastal_Mountain_Residence",
    "development-civil",
    "High Alpine Mtn. Ranch",
    "hillside-cleanup",
    "laguna-grande",
    "Mtn. Mid-Rise Luxe Condo",
    "New Residential Construction",
    "north-florida",
    "pacific-grove",
    "S. Florida High Rise Luxe",
    "Syracuse House",
    "Ultra Luxe Private Pool",
    "beachfront_estate"
)

$result = @{}

foreach ($folder in $folders) {
    $folderPath = Join-Path $projectsDir $folder
    if (Test-Path $folderPath) {
        $images = Get-ChildItem -Path $folderPath -Include *.jpg, *.jpeg, *.png, *.gif, *.webp, *.JPG, *.PNG -Recurse
        $imageAccl = @()
        foreach ($img in $images) {
            # Create web path
            $relPath = $img.FullName.Substring($publicDir.Length)
            $webPath = $relPath -replace '\\', '/'
            $imageAccl += $webPath
        }
        $result[$folder] = $imageAccl
    }
}

$result | ConvertTo-Json -Depth 5
