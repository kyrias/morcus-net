import fs from "fs";

import { LewisAndShort } from "./ls";

const LS_SUBSET = "testdata/ls/subset.xml";
const TEMP_FILE = "ls.test.ts.tmp.txt";

function writeFile(contents: string) {
  fs.writeFileSync(TEMP_FILE, contents);
}

describe("LewisAndShort", () => {
  afterEach(() => {
    try {
      fs.unlinkSync(TEMP_FILE);
    } catch (e) {}
  });

  test("createProcessed processes elements", () => {
    const lewisAndShort = LewisAndShort.createProcessed(LS_SUBSET);

    const result = lewisAndShort.filter((entry) => entry.key === "camus");

    expect(result).toHaveLength(1);
    expect(result[0].entry).toContain("A muzzle");
  });

  test("save removes existing contents if present", async () => {
    writeFile("foo");

    await LewisAndShort.save([{ key: "bar", entry: "baz" }], TEMP_FILE);

    const result = fs.readFileSync(TEMP_FILE).toString();

    expect(result).not.toContain("foo");
    expect(result).toContain("bar");
  });

  test("save writes in expected format", async () => {
    const data = [
      { key: "Julius", entry: "Gallia est omnis divisa in partes tres" },
      { key: "Publius", entry: "Non iterum repetenda suo" },
    ];
    await LewisAndShort.save(data, TEMP_FILE);

    const result = fs.readFileSync(TEMP_FILE).toString();
    const lines = result.split("\n");

    expect(lines).toHaveLength(5);
    expect(lines[0]).toBe(data[0].key);
    expect(lines[1]).toBe(data[0].entry);
    expect(lines[2]).toBe(data[1].key);
    expect(lines[3]).toBe(data[1].entry);
    // We expect a terminal newline, so there will be an empty string
    // at the end of the split.
    expect(lines[4]).toBe("");
  });

  test("save replaces newlines in contents", async () => {
    await LewisAndShort.save([{ key: "ba\nr", entry: "baz\n" }], TEMP_FILE);

    const result = fs.readFileSync(TEMP_FILE).toString();
    const lines = result.split("\n");

    expect(lines).toHaveLength(3);
    expect(lines[0]).toBe("ba@r");
    expect(lines[1]).toBe("baz@");
    // We expect a terminal newline, so there will be an empty string
    // at the end of the split.
    expect(lines[2]).toBe("");
  });

  test("create has expected entries", async () => {
    const data = [
      { key: "Julius", entry: "Gallia est omnis" },
      { key: "ba\nr", entry: "baz\n" },
      { key: "Publius", entry: "Non iterum repetenda suo" },
    ];

    await LewisAndShort.save(data, TEMP_FILE);
    const dict = await LewisAndShort.create(TEMP_FILE);

    expect(await dict.getEntry("Julius")).toBe("Gallia est omnis");
    expect(await dict.getEntry("ba\nr")).toBe("baz\n");
    expect(await dict.getEntry("Publius")).toBe("Non iterum repetenda suo");
    expect(await dict.getEntry("Foo")).toContain("Could not find entry");
  });
});