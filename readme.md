# Lossless Image Compression

**Step 1:** Split the image into chunks (164 bytes).

```
1:  12, 12, 12, 255
2:  12, 24, 12, 255
3:  12, 12, 24, 245
4:  24, 24, 24, 245
5:  12, 12, 12, 255
6:  24, 24, 24, 245
7:  24, 245, 245, 245
8:  245, 245, 245, 245
```

**Step 2:** Convert numbers to specials chars (71 bytes).

```
1:  ŸŸŸδ
2:  Ÿ■Ÿδ
3:  ŸŸ■ß
4:  ■■■ß
5:  ŸŸŸδ
6:  ■■■ß
7:  ■ßßß
8:  ßßßß
```

**Step 3:** Dedup chunks by mapping and ref (65 bytes).

```
1:  ŸŸŸδ
2:  Ÿ■Ÿδ
3:  ŸŸ■ß
4:  ■■■ß
5:  1
6:  4
7:  ■ßßß
8:  ßßßß
```

**Step 4:** Shorten chunks with 3+ same chars (59 bytes).

```
1:  Ÿ-δ
2:  Ÿ■Ÿδ
3:  ŸŸ■ß
4:  ■-ß
5:  1
6:  4
7:  ■ß-
8:  ß
```