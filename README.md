## Running the project locally
```
dfx start --clean

dfx deploy
```

## Find out your principal id

```
dfx identity get-principal
```

## Check canister ID
```
dfx canister id token_backend
```

## Save canister ID into a command line variable
```
CANISTER_PUBLIC_KEY="principal \"$( \dfx canister id token_backend )\""
```

## Check canister ID has been successfully saved
```
echo $CANISTER_PUBLIC_KEY
```

## Transfer half a billion tokens to the canister Principal ID
```
dfx canister call token_backend transfer "($CANISTER_PUBLIC_KEY, 500_000_000)"
```# token
