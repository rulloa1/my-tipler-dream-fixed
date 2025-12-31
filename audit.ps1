
$projectRoot = "C:\Users\roryu\my-tipler-dream-5"
$projectsFile = Join-Path $projectRoot "src\data\projects.ts"
$publicDir = Join-Path $projectRoot "public"

Write-Host "Reading projects.ts..."
$content = Get-Content $projectsFile -Raw

# Regex to find paths starting with /projects/ or /design/
# Matches "/projects/..." or "/design/..." inside quotes
$regex = '["''](/\b(?:projects|design)\b/[^"''\s]+)["'']'
$matches = [regex]::Matches($content, $regex)

$usedPaths = @{}
foreach ($match in $matches) {
    $path = $match.Groups[1].Value
    $usedPaths[$path] = $true
}

Write-Host "Found $($usedPaths.Count) unique image paths in projects.ts"

$brokenPaths = @()
foreach ($webPath in $usedPaths.Keys) {
    # Remove leading slash for Join-Path
    $relPath = $webPath.TrimStart('/')
    # Correct slash direction for Windows
    $relPathOS = $relPath -replace '/', '\'
    $fullPath = Join-Path $publicDir $relPathOS
    
    if (-not (Test-Path $fullPath)) {
        $brokenPaths += $webPath
    }
}

Write-Host "`n=== BROKEN PATHS ($($brokenPaths.Count)) ==="
$brokenPaths | ForEach-Object { Write-Host $_ }

Write-Host "`nScanning for unused images..."
$unusedImages = @()

# Get all images in public/projects and public/design
$images = Get-ChildItem -Path "$publicDir\projects", "$publicDir\design" -Recurse -Include *.jpg,*.jpeg,*.png,*.gif,*.webp,*.JPG,*.PNG

foreach ($img in $images) {
    # Construct web path
    $relPath = $img.FullName.Substring($publicDir.Length)
    # Convert backslashes to forward slashes
    $webPath = $relPath -replace '\\', '/'
    
    if (-not $usedPaths.ContainsKey($webPath)) {
        $unusedImages += $webPath
    }
}

Write-Host "`n=== UNUSED IMAGES ($($unusedImages.Count)) ==="
$unusedImages | Group-Object { Split-Path $_ -Parent } | ForEach-Object {
    Write-Host "`nFolder: $($_.Name)"
    $_.Group | ForEach-Object { Write-Host "  - $(Split-Path $_ -Leaf)" }
}
