#!/usr/bin/env fish




function aws-set-profile-exec
    set newProf $argv[1]
    echo "AWS_PROFILE=$newProf"
    set -xg AWS_PROFILE $newProf

    # GET ID/KEY AFTER
    set awsId (aws configure get aws_access_key_id)
    set awsSecret (aws configure get aws_secret_access_key)
    set awsRegion (aws configure get region)
    echo "REGION=$awsRegion"
    set -xg AWS_REGION $awsRegion
    set -xg AWS_DEFAULT_REGION $awsRegion
    set -xg AWS_ACCESS_KEY_ID $awsId
    set -xg AWS_SECRET_ACCESS_KEY $awsSecret
end

function aws-set-profile
    set newProf $argv[1]
    if test -z "$newProf"
        set prof "$AWS_PROFILE"
        if test -z "$prof"
            aws-set-profile-exec "default"
        else
            aws-set-profile-exec $prof
        end
    else
        aws-set-profile-exec $newProf
    end
    return 0
end
