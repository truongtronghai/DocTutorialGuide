# 🚀 PowerShell Cheat Sheet

In PowerShell, commands use a **Verb-Noun** format (e.g., `Get-Process`). You can use shorter **Aliases** (like `ls` or `ps`) to type faster.

---

## 🔍 System Information & Help
* **`Get-Help <Command>`** — Displays the manual and usage examples for any command (alias: `help`).
* **`Get-Command`** — Lists all available commands, functions, and aliases on your system.
* **`Get-Member`** — Shows properties and methods available for an object via pipeline (alias: `gm`).
  * *Example:* `Get-Process | Get-Member`
* **`$PSVersionTable`** — Displays your current PowerShell engine version and operating system details.

## 📂 Files & Directories
* **`Get-ChildItem`** — Lists files and folders in the current directory (aliases: `ls`, `dir`).
* **`Set-Location <Path>`** — Changes the active directory path (aliases: `cd`, `sl`).
* **`New-Item -ItemType File <Name>`** — Creates a new empty file (alias: `ni`).
* **`New-Item -ItemType Directory <Name>`** — Creates a new folder or directory path.
* **`Remove-Item <Path>`** — Deletes files or folders permanently (aliases: `rm`, `del`).
* **`Copy-Item <Source> <Dest>`** — Copies files or folders to a new location (alias: `cp`).
* **`Move-Item <Source> <Dest>`** — Moves or renames files or folders (alias: `mv`).
* **`Get-Content <File>`** — Displays the text contents of a file inside the console (aliases: `cat`, `type`).
* **`Set-Content <File> "<Text>"`** — Overwrites or writes new text content into a target file.
* **`Add-Content <File> "<Text>"`** — Appends text to the end of an existing file.

## ⚙️ Processes & Services
* **`Get-Process`** — Lists all currently active system processes running on the machine (alias: `ps`).
* **`Stop-Process -Name <Name>`** — Forces a running process to terminate immediately (alias: `kill`).
* **`Get-Service`** — Displays the status of all registered Windows services.
* **`Start-Service <Name>`** — Launches a stopped background Windows service.
* **`Stop-Service <Name>`** — Halts a running background Windows service.

## 🛠️ Pipelines, Filtering & Formatting
* **`Where-Object`** — Filters objects out of a pipeline using specific conditions (alias: `?`).
  * *Example:* `Get-Service | Where-Object {$_.Status -eq "Running"}`
* **`Select-Object`** — Selects only specific properties of an object to display (alias: `select`).
* **`ForEach-Object`** — Loops through every individual item passed along a pipeline (alias: `%`).
* **`Sort-Object`** — Sorts collection outputs by designated properties (alias: `sort`).
* **`Format-Table`** — Organizes console output into clean, structured data tables (alias: `ft`).
* **`Format-List`** — Displays output properties vertically as an explicit list (alias: `fl`).

## 🌐 Networking
* **`Test-NetConnection <IP/Domain>`** — Performs a diagnostic ping and port check (alias: `tnc`).
* **`Invoke-WebRequest <URL>`** — Sends an HTTP/HTTPS request to a web endpoint or API (alias: `iwr`).
* **`Invoke-RestMethod <URL>`** — Sends an HTTP request and formats JSON/XML responses automatically (alias: `irm`).
* **`Get-NetIPAddress`** — Displays your current IP addresses and network interface details.
