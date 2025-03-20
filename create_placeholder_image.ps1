Add-Type -AssemblyName System.Drawing

# Create a 200x200 round profile placeholder image
$width = 200
$height = 200
$bitmap = New-Object System.Drawing.Bitmap($width, $height)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)

# Fill background with accent color
$bgColor = [System.Drawing.Color]::FromArgb(67, 97, 238) # Using accent color #4361ee
$graphics.Clear($bgColor)

# Add white text label
$font = New-Object System.Drawing.Font("Arial", 32, [System.Drawing.FontStyle]::Bold)
$brush = [System.Drawing.Brushes]::White
$stringFormat = New-Object System.Drawing.StringFormat
$stringFormat.Alignment = [System.Drawing.StringAlignment]::Center
$stringFormat.LineAlignment = [System.Drawing.StringAlignment]::Center
$graphics.DrawString("WB", $font, $brush, [System.Drawing.RectangleF]::new(0, 0, $width, $height), $stringFormat)

# Save the bitmap
$bitmap.Save("D:\walter_bredlow___portfolio_by_GreatCreations\images\placeholders\profile_placeholder.png", [System.Drawing.Imaging.ImageFormat]::Png)

# Clean up
$graphics.Dispose()
$bitmap.Dispose()

Write-Host "Placeholder image created successfully!"
