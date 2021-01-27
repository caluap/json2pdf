import json

with open('data.json') as f:
    data = json.load(f)


def setup():
    size(data['canvas']['w'], data['canvas']['h'], P3D)


def draw():
    background(0)
    for instruction in data['instructions']:
        if instruction["command"] == "line":
            if "strokeColor" in instruction:
                stroke(instruction["strokeColor"])
            if "strokeWeight" in instruction:
                strokeWeight(int(instruction["strokeWeight"]))
            p1 = instruction["p1"]
            p2 = instruction["p2"]
            line(p1["x"], p1["y"], p1["z"], p2["x"], p2["y"], p2["z"])

    save("output.png")
    exit()
