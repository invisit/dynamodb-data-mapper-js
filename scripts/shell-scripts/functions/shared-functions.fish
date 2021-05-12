#!/usr/bin/env fish

set rootDir (dirname (dirname (dirname (dirname (realpath (status filename))))))
echo "Root: $rootDir"

function die
  echo "$argv failed, exiting"
  exit 255
end

function run
	set cmd $argv
	eval "$cmd";or die "An error occurred while executing: $cmd"
end

# Prepare global environment
set -pgx PATH $PWD/bin
