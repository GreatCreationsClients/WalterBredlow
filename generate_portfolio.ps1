$signImages = Get-ChildItem -Path "D:\signs" -Filter "*.jpg" | Select-Object -ExpandProperty Name
$paintingImages = Get-ChildItem -Path "D:\painting" -Filter "*.jpg" | Select-Object -ExpandProperty Name
$sculptureImages = Get-ChildItem -Path "D:\sculpture" -Filter "*.jpg" | Where-Object { $_ -ne "prrinting" } | Select-Object -ExpandProperty Name
$graphicsImages = Get-ChildItem -Path "D:\graphics" -Filter "*.jpg" | Select-Object -ExpandProperty Name
$multimediaImages = Get-ChildItem -Path "D:\multi-media" -Filter "*.jpg" | Select-Object -ExpandProperty Name
$diagramsImages = Get-ChildItem -Path "D:\diagrams" -Filter "*.jpg" | Select-Object -ExpandProperty Name
$fontsImages = Get-ChildItem -Path "D:\fonts" -Filter "*.jpg" | Select-Object -ExpandProperty Name

# Generate JavaScript code for config.js
$js = "// Portfolio data configuration`r`nexport const portfolioData = {`r`n"

# Signs Section
$js += "  signs: [`r`n"
foreach ($image in $signImages) {
    $title = $image -replace "\.jpg$", "" -replace "_", " " -replace "-", " "
    $imageFile = $image
    $js += "    {`r`n"
    $js += "      title: `"$title`",`r`n"
    $js += "      image: `"images/signs/$imageFile`",`r`n"
    $js += "      description: `"<p>Professional signage project showcasing design skills and technical implementation.</p><p>This image demonstrates attention to detail and understanding of visual communication principles.</p>`"`r`n"
    $js += "    },`r`n"
}
$js = $js.TrimEnd(",`r`n")
$js += "`r`n  ],`r`n"

# Painting Section (includes both painting and sculpture)
$js += "  painting: [`r`n"
foreach ($image in $paintingImages) {
    $title = "Painting - " + ($image -replace "\.jpg$", "" -replace "_", " " -replace "-", " ")
    $imageFile = $image
    $js += "    {`r`n"
    $js += "      title: `"$title`",`r`n"
    $js += "      image: `"images/painting/$imageFile`",`r`n"
    $js += "      description: `"<p>Original painting exploring color, form, and composition.</p><p>This work demonstrates artistic style and creative expression.</p>`"`r`n"
    $js += "    },`r`n"
}

# Add sculpture images to painting section
foreach ($image in $sculptureImages) {
    $title = "Sculpture - " + ($image -replace "\.jpg$", "" -replace "_", " " -replace "-", " ")
    $imageFile = $image
    $js += "    {`r`n"
    $js += "      title: `"$title`",`r`n"
    $js += "      image: `"images/sculpture/$imageFile`",`r`n"
    $js += "      description: `"<p>Sculptural work exploring three-dimensional form and material relationships.</p><p>This piece demonstrates spatial awareness and material manipulation skills.</p>`"`r`n"
    $js += "    },`r`n"
}
$js = $js.TrimEnd(",`r`n")
$js += "`r`n  ],`r`n"

# Graphics Section (includes both graphics and multimedia)
$js += "  graphics: [`r`n"
foreach ($image in $graphicsImages) {
    $title = "Graphic Design - " + ($image -replace "\.jpg$", "" -replace "_", " " -replace "-", " ")
    $imageFile = $image
    $js += "    {`r`n"
    $js += "      title: `"$title`",`r`n"
    $js += "      image: `"images/graphics/$imageFile`",`r`n"
    $js += "      description: `"<p>Graphic design project showcasing visual communication and branding skills.</p><p>This work demonstrates understanding of design principles and creative problem-solving.</p>`"`r`n"
    $js += "    },`r`n"
}

# Add multimedia images to graphics section
foreach ($image in $multimediaImages) {
    $title = "Multimedia - " + ($image -replace "\.jpg$", "" -replace "_", " " -replace "-", " ")
    $imageFile = $image
    $js += "    {`r`n"
    $js += "      title: `"$title`",`r`n"
    $js += "      image: `"images/multimedia/$imageFile`",`r`n"
    $js += "      description: `"<p>Multimedia project combining multiple design disciplines and technologies.</p><p>This work demonstrates versatility and innovation in digital media creation.</p>`"`r`n"
    $js += "    },`r`n"
}
$js = $js.TrimEnd(",`r`n")
$js += "`r`n  ],`r`n"

# Diagrams Section (includes both diagrams and fonts)
$js += "  diagrams: [`r`n"
foreach ($image in $diagramsImages) {
    $title = "Diagram - " + ($image -replace "\.jpg$", "" -replace "_", " " -replace "-", " ")
    $imageFile = $image
    $js += "    {`r`n"
    $js += "      title: `"$title`",`r`n"
    $js += "      image: `"images/diagrams/$imageFile`",`r`n"
    $js += "      description: `"<p>Information visualization project showcasing data organization and clarity.</p><p>This diagram demonstrates skill in presenting complex information in an accessible format.</p>`"`r`n"
    $js += "    },`r`n"
}

# Add fonts images to diagrams section
foreach ($image in $fontsImages) {
    $title = "Typography - " + ($image -replace "\.jpg$", "" -replace "_", " " -replace "-", " ")
    $imageFile = $image
    $js += "    {`r`n"
    $js += "      title: `"$title`",`r`n"
    $js += "      image: `"images/fonts/$imageFile`",`r`n"
    $js += "      description: `"<p>Typography project showcasing letterform design and typographic principles.</p><p>This work demonstrates understanding of readability, hierarchy, and typographic expressiveness.</p>`"`r`n"
    $js += "    },`r`n"
}
$js = $js.TrimEnd(",`r`n")
$js += "`r`n  ]`r`n"

$js += "};"

# Write to config.js
Set-Content -Path "D:\walter_bredlow___portfolio_by_GreatCreations\config.js" -Value $js

# Copy all images
Write-Host "Copying all images..."

# Ensure directory structure exists
$imageDirs = @("signs", "painting", "sculpture", "graphics", "multimedia", "diagrams", "fonts")
foreach ($dir in $imageDirs) {
    if (-not (Test-Path "D:\walter_bredlow___portfolio_by_GreatCreations\images\$dir")) {
        New-Item -Path "D:\walter_bredlow___portfolio_by_GreatCreations\images\$dir" -ItemType Directory -Force | Out-Null
    }
}

# Copy signs images
foreach ($image in $signImages) {
    Copy-Item -Path "D:\signs\$image" -Destination "D:\walter_bredlow___portfolio_by_GreatCreations\images\signs\" -Force
}

# Copy painting images
foreach ($image in $paintingImages) {
    Copy-Item -Path "D:\painting\$image" -Destination "D:\walter_bredlow___portfolio_by_GreatCreations\images\painting\" -Force
}

# Copy sculpture images
foreach ($image in $sculptureImages) {
    Copy-Item -Path "D:\sculpture\$image" -Destination "D:\walter_bredlow___portfolio_by_GreatCreations\images\sculpture\" -Force
}

# Copy graphics images
foreach ($image in $graphicsImages) {
    Copy-Item -Path "D:\graphics\$image" -Destination "D:\walter_bredlow___portfolio_by_GreatCreations\images\graphics\" -Force
}

# Copy multimedia images
foreach ($image in $multimediaImages) {
    Copy-Item -Path "D:\multi-media\$image" -Destination "D:\walter_bredlow___portfolio_by_GreatCreations\images\multimedia\" -Force
}

# Copy diagrams images
foreach ($image in $diagramsImages) {
    Copy-Item -Path "D:\diagrams\$image" -Destination "D:\walter_bredlow___portfolio_by_GreatCreations\images\diagrams\" -Force
}

# Copy fonts images
foreach ($image in $fontsImages) {
    Copy-Item -Path "D:\fonts\$image" -Destination "D:\walter_bredlow___portfolio_by_GreatCreations\images\fonts\" -Force
}

Write-Host "Portfolio data generated and all images copied successfully!"
