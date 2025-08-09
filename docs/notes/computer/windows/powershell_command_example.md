---
title: "PowerShell 常用命令实例"
category: 通用计算机
subcategory: Windows
level: 5
tags:
  - windows
  - command
  - powershell
---

# PowerShell 常用命令实例

## 自用 shell 脚本

检查 C++ 14 是否安装

```powershell
# FileName: CheckInstallCPP14.ps1
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
```