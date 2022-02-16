# Lossless Image Compression

**Step 1:** Split the image into chunks

```
1:  12, 12, 12, 255
2:  12, 24, 12, 255
3:  12, 12, 24, 245
4:  24, 24, 24, 245
5:  12, 12, 12, 255
6:  24, 24, 24, 245
```

**Step 2:** Convert numbers to specials chars.

```
1:  ŸŸŸδ
2:  Ÿ■Ÿδ
3:  ŸŸ■ß
4:  ■■■ß
5:  ŸŸŸδ
6:  ■■■ß
```

**Step 3:** Dedup chunks by mapping and ref.

```
1:  ŸŸŸδ
2:  Ÿ■Ÿδ
3:  ŸŸ■ß
4:  ■■■ß
5:  1
6:  4
```