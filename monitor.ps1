# QWEN-NEWS Monitoring Script
# This script provides real-time monitoring of the QWEN-NEWS project

 param(
    [int]$RefreshInterval = 5,
    [switch]$Continuous,
    [switch]$LogToFile
)

# Function to get project statistics
function Get-ProjectStats {
    $statsPath = Join-Path $PSScriptRoot "project-stats.json"
    
    if (Test-Path $statsPath) {
        try {
            $stats = Get-Content $statsPath | ConvertFrom-Json
            return $stats
        } catch {
            Write-Warning "Error reading stats file: $_"
            return $null
        }
    } else {
        Write-Warning "Stats file not found: $statsPath"
        return $null
    }
}

# Function to display statistics
function Show-Stats {
    $stats = Get-ProjectStats
    
    if ($stats) {
        Clear-Host
        Write-Host "========================================" -ForegroundColor Cyan
        Write-Host "        QWEN-NEWS PROJECT MONITOR       " -ForegroundColor Cyan
        Write-Host "========================================" -ForegroundColor Cyan
        Write-Host ""
        
        # Basic Info
        Write-Host "Project Start Time: " -NoNewline
        Write-Host "$([DateTime]$stats.startTime)" -ForegroundColor Yellow
        
        if ($stats.uptimeHours) {
            Write-Host "Uptime: " -NoNewline
            Write-Host "$([math]::Round($stats.uptimeHours, 2)) hours" -ForegroundColor Green
        }
        
        Write-Host "Last Updated: " -NoNewline
        Write-Host "$([DateTime]$stats.lastUpdated)" -ForegroundColor Gray
        Write-Host ""
        
        # Performance Metrics
        Write-Host "PERFORMANCE METRICS" -ForegroundColor Cyan
        Write-Host "==================" -ForegroundColor Cyan
        
        Write-Host "Total Requests: " -NoNewline
        Write-Host "$($stats.totalRequests)" -ForegroundColor Green
        
        Write-Host "Total Scraped Articles: " -NoNewline
        Write-Host "$($stats.totalScrapedArticles)" -ForegroundColor Green
        
        if ($stats.averageResponseTime) {
            Write-Host "Average Response Time: " -NoNewline
            Write-Host "$([math]::Round($stats.averageResponseTime, 2)) ms" -ForegroundColor Green
        }
        
        Write-Host "Errors: " -NoNewline
        if ($stats.errors -gt 0) {
            Write-Host "$($stats.errors)" -ForegroundColor Red
        } else {
            Write-Host "$($stats.errors)" -ForegroundColor Green
        }
        Write-Host ""
        
        # System Info
        Write-Host "SYSTEM INFORMATION" -ForegroundColor Cyan
        Write-Host "==================" -ForegroundColor Cyan
        
        $os = Get-CimInstance Win32_OperatingSystem
        Write-Host "OS: " -NoNewline
        Write-Host "$($os.Caption)" -ForegroundColor Gray
        
        $cpu = Get-CimInstance Win32_Processor
        Write-Host "CPU: " -NoNewline
        Write-Host "$($cpu.Name)" -ForegroundColor Gray
        
        $memory = Get-CimInstance Win32_PhysicalMemory | Measure-Object -Property Capacity -Sum
        $totalMemory = [math]::Round($memory.Sum / 1GB, 2)
        Write-Host "Total Memory: " -NoNewline
        Write-Host "$totalMemory GB" -ForegroundColor Gray
        
        # Process Info
        $process = Get-Process -Name node -ErrorAction SilentlyContinue
        if ($process) {
            Write-Host ""
            Write-Host "RUNNING PROCESSES" -ForegroundColor Cyan
            Write-Host "=================" -ForegroundColor Cyan
            $process | ForEach-Object {
                Write-Host "Node.js Process ID: " -NoNewline
                Write-Host "$($_.Id)" -ForegroundColor Gray
                Write-Host "Working Set: " -NoNewline
                Write-Host "$([math]::Round($_.WorkingSet / 1MB, 2)) MB" -ForegroundColor Gray
                Write-Host "CPU Time: " -NoNewline
                Write-Host "$($_.TotalProcessorTime)" -ForegroundColor Gray
            }
        }
    } else {
        Write-Host "Unable to retrieve project statistics" -ForegroundColor Red
    }
}

# Function to log to file
function Write-Log {
    param([string]$Message)
    
    if ($LogToFile) {
        $logPath = Join-Path $PSScriptRoot "monitoring-ps.log"
        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        "$timestamp - $Message" | Out-File -FilePath $logPath -Append
    }
}

# Main monitoring loop
function Start-Monitoring {
    Write-Log "Monitoring started with refresh interval: $RefreshInterval seconds"
    
    if ($Continuous) {
        Write-Host "Starting continuous monitoring... Press Ctrl+C to stop" -ForegroundColor Yellow
        while ($true) {
            Show-Stats
            Write-Log "Stats refreshed"
            Start-Sleep -Seconds $RefreshInterval
        }
    } else {
        Show-Stats
        Write-Log "Single stats display completed"
    }
}

# Script entry point
try {
    Write-Log "QWEN-NEWS Monitoring Script Started"
    Start-Monitoring
    Write-Log "QWEN-NEWS Monitoring Script Completed"
} catch {
    Write-Error "Script error: $_"
    Write-Log "Script error: $_"
}