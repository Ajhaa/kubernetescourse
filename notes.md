Time spent before starting notes: less than two hours.

More info about kubernetes cluster: in the beginning?
What is a kubeconfig, why is it needed?

Missing an example about how to use the persistent volume claim

Usefull shit: `source <(kubectl completion bash)`
Exec inside pod `kubectl exec --stdin --tty <pod name> -- /bin/bash`

:latest or a specific version?

## PART 2



More explanations for namespaces:
  - creating
  - using
  - switching default

How persistentvolumeclaims work???
500Mi instead of full 1Gi

NOPE ^^ PersistentVolumes binds are exclusive
Back to this later

What happens here?
`The application won’t run at first and we can see the reason with kubectl get po and a more detailed with kubectl describe pod imageapi-dep-....`  
Just run the commands prkl

The whole part feels very clunky.

Link to redis docker image when talking about it?

Why a port in deployment for postgres


### Nit
- an context -> a context
- which container / which containers