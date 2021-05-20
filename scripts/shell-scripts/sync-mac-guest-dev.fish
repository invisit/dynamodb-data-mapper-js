#!/usr/bin/env fish

set logFile /tmp/watchman-ddb-mapper.log

function log
  echo "$argv" >> $logFile
  echo "$argv"
end

set args $argv

set scriptsDir (dirname (realpath (status filename)))
set projectName "dynamodb-data-mapper-js"

echo "Scripts: $scriptsDir"
for scriptFile in $scriptsDir/functions/*.fish
  echo "Loading script: $scriptFile"
  source $scriptFile
end


set argCount (count $args)
set excludeFromFile $rootDir/etc/watchman/exclude-sync.txt

log "Syncing ($projectName) to mac-guest-dev"
rsync -av -e ssh \
  --delete-after \
  --exclude-from=$excludeFromFile \
  /projects/invisit/$projectName/ \
  mac-guest-dev:/opt/code/$projectName/
