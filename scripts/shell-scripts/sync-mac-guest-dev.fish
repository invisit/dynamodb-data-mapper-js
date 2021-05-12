#!/usr/bin/env fish

set args $argv

set scriptsDir (dirname (realpath (status filename)))

echo "Scripts: $scriptsDir"
for scriptFile in $scriptsDir/functions/*.fish
  echo "Loading script: $scriptFile"
  source $scriptFile
end


function do_sync
  set src $argv[1]
  echo "sync '$src'"
#  rsync -av -e ssh $argv mac-guest-dev:/opt/code/invisit-platform/$argv
#  rsync -av -e ssh /projects/invisit/dynamodb-data-mapper-js/ mac-guest-dev:/opt/code/dynamodb-data-mapper-js/
end

set argCount (count $args)
echo "invoked with $argv" >> $rootDir/logs/watchman.log
echo "arg count: $argCount"
if test $argCount -eq 0
#  do_sync
  echo "no args"
else
  for arg in $argv
    do_sync $arg
#    echo "rsync $arg"
  end
end
