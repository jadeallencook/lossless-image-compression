# Lossless Image Compression

**Step 1:** Convert photo to RGBA chunks.

```
1:  1, 2, 3, 4
2:  1, 2, 3, 4
3:  5, 6, 7, 8
4:  1, 2, 3, 4
5:  5, 6, 7, 8
```

**Step 2:** Store chunks in map and ref them.

```
1:  1, 2, 3, 4
2:  1
3:  5, 6, 7, 8
4:  1
5:  3
```
