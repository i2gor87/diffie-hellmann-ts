# Diffie-Hellmann algorithm implementation

## Project structure

##### Alice:
Has one public REST API:

- /get_categories

Calls to bobURL/get_categories and returns categories.

##### Bob:

Has two public REST APIs:

- /get_key (POST)

Returns calculated prime number if the payload is right:

```js
{
    "bob_y": %number%
}
```

- /get_categories (POST)

Returns categories if the payload is right:

```js
{
    "categories": ["category1", "category2"]
}
```
####### Diffie-Hellman algorithm implemented in code:

1. Alice computes random big prime number: `p`
2. Alice generates big prime number `g` = $$g^{p-1} mod \: p$$
3. Alice computes `x` = $$g^{A} mod \: p$$
4. Alice generates random big prime number: `A`
5. Alice sends `p`, `g` and `x` to Bob to `bobURL/get_key`
6. Bob generates random big prime number: `B`
7. Bob calculates `y` = $$g^{B} mod \: p$$
8. Bob sends `y` to Alice as response to her request to `bobURL/get_key`
9. Alice calculates secret key `alice_K` = $$y^{A} mod \: p$$
10. Bob calculates secret key `bob_K` = $$x^{B} mod \: p$$
```js
alice_K === bob_K
```
11. Alice encodes string with `alice_K` and POSTs to `bobURL/get_categories`
12. Bob tries to decrypt the message with `bob_K`. On success, Bob sends data to Alice. In all other cases, no data is exposed.

###Logic:

Alice talks to Bob and Eve listens to the traffic, has all the payload that Alice and Bob send to each other.
In that environment, Alice and Bob calculate their common secret key without letting it out in the open so Eve doesn't know it. And reverse programming is too complex to match.

### TO-DO:

1. Algorithm is pretty slow on prime numbers > 999 (There is another way to calculate, I'm sure)
2. Algorithm is vulnerable to MITM attacks (man-in-the-middle). E.g. Alice <-> Eve <-> Bob. There is no way for Bob to verify that the person that sends him the payload is Alice.
It can be resolved with implementing MQV protocol.




