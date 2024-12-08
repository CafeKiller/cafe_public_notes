$requiredVersion = "14.0"
$installenVersion = Get-ChildItem "HKLM:\SOFTWARE\Microsoft\VisualStudio\14.0\VC\Runtimes\x64" -ErrorAction SilentlyContinue | Get-ItemProperty -Name Version

if($installenVersion -contains $requiredVersion) 
{
    Write-Host "[SUCCESS] - Installed C++ 14"
}
else
{
    Write-Host "[ERROR] - Not Installed C++ 14"
}