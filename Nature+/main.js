const TreeType = {
	NORMAL: null,
	TALL: null,
	SMALL: null,
	SLANTED: null,
	FAT: null
};

var Tree = {
	constructor: [],
	construct: [],
	load: function(){
		var file = ModPE.loadFile("Nature+-Tree.data");
		var lines = file.split(";");
		for(var i in lines){
			var params = lines[i].split(",");
			var x = parseInt(params[0]);
			var y = parseInt(params[1]);
			var z = parseInt(params[2]);
			var time = parseInt(params[3]);
		}
	},
	save: function(){
		var str = "";
		for(var i in this.construct){
			var t = this.construct[i];
			var params = [t.x, t.y, t.z, t.time];
			str += params.join(",") + ";";
		}
		ModPE.saveFile("Nature+-Tree.data", str);
	},
	useItem: function(x, y, z, itemId, blockId, side, itemDat, blockDat){
		for(var i in this.constructor){
			if(itemId == this.constructor[i].sapling && (blockId == 2 || blockId == 3) && side == 1){
				Level.setTile(x, y + 1, z, itemId, 0);
				replaceDirt(x, y, z);
				Player.addItemInventory(itemId, -1, 0);
				Level.playSoundEnt(getPlayerEnt(), "dig.dirt1", 100, 5);
				this.construct.push({
					x: x,
					y: y + 1,
					z: z,
					time: this.constructor[i].time,
					log: this.constructor[i].logId,
					leaf: this.constructor[i].leafId,
					type: this.constructor[i].type
				})
			}
		}
	},
	modTick: function(){
		for(var i in this.construct){
			this.construct[i].time--;
			if(this.construct[i].time == 0){
				this.construct.splice(i, 1);
				this.placeTree(this.construct[i].x, this.construct[i].y, this.construct[i].z, this.construct[i].log, this.construct[i].leaf, this.construct[i].type);
			}
		}
	},
	placeTree: function(x, y, z, log, leaf, type){
		switch(type){
			case TreeType.NORMAL:
				var struct = [[x+(-2), y+(3), z+(-1), leaf, 0], [x+(-2), y+(3), z+(0), leaf, 0], [x+(-2), y+(3), z+(1), leaf, 0], [x+(-2), y+(4), z+(-2), leaf, 0], [x+(-2), y+(4), z+(-1), leaf, 0], [x+(-2), y+(4), z+(0), leaf, 0], [x+(-2), y+(4), z+(1), leaf, 0], [x+(-1), y+(3), z+(-2), leaf, 0], [x+(-1), y+(3), z+(-1), leaf, 0], [x+(-1), y+(3), z+(0), leaf, 0], [x+(-1), y+(3), z+(1), leaf, 0], [x+(-1), y+(3), z+(2), leaf, 0], [x+(-1), y+(4), z+(-2), leaf, 0], [x+(-1), y+(4), z+(-1), leaf, 0], [x+(-1), y+(4), z+(0), leaf, 0], [x+(-1), y+(4), z+(1), leaf, 0], [x+(-1), y+(4), z+(2), leaf, 0], [x+(-1), y+(5), z+(0), leaf, 0], [x+(-1), y+(6), z+(0), leaf, 0], [x+(0), y+(0), z+(0), log, 0], [x+(0), y+(1), z+(0), log, 0], [x+(0), y+(2), z+(0), log, 0], [x+(0), y+(3), z+(-2), leaf, 0], [x+(0), y+(3), z+(-1), leaf, 0], [x+(0), y+(3), z+(0), log, 0], [x+(0), y+(3), z+(1), leaf, 0], [x+(0), y+(3), z+(2), leaf, 0], [x+(0), y+(4), z+(-2), leaf, 0], [x+(0), y+(4), z+(-1), leaf, 0], [x+(0), y+(4), z+(0), log, 0], [x+(0), y+(4), z+(1), leaf, 0], [x+(0), y+(4), z+(2), leaf, 0], [x+(0), y+(5), z+(-1), leaf, 0], [x+(0), y+(5), z+(0), log, 0], [x+(0), y+(5), z+(1), leaf, 0], [x+(0), y+(6), z+(-1), leaf, 0], [x+(0), y+(6), z+(0), leaf, 0], [x+(0), y+(6), z+(1), leaf, 0], [x+(1), y+(3), z+(-2), leaf, 0], [x+(1), y+(3), z+(-1), leaf, 0], [x+(1), y+(3), z+(0), leaf, 0], [x+(1), y+(3), z+(1), leaf, 0], [x+(1), y+(3), z+(2), leaf, 0], [x+(1), y+(4), z+(-2), leaf, 0], [x+(1), y+(4), z+(-1), leaf, 0], [x+(1), y+(4), z+(0), leaf, 0], [x+(1), y+(4), z+(1), leaf, 0], [x+(1), y+(4), z+(2), leaf, 0], [x+(1), y+(5), z+(0), leaf, 0], [x+(1), y+(5), z+(1), leaf, 0], [x+(1), y+(6), z+(0), leaf, 0], [x+(2), y+(3), z+(-2), leaf, 0], [x+(2), y+(3), z+(-1), leaf, 0], [x+(2), y+(3), z+(0), leaf, 0], [x+(2), y+(3), z+(1), leaf, 0], [x+(2), y+(4), z+(-2), leaf, 0], [x+(2), y+(4), z+(-1), leaf, 0], [x+(2), y+(4), z+(0), leaf, 0], [x+(2), y+(4), z+(1), leaf, 0], [x+(2), y+(4), z+(2), leaf, 0]];
				for(var i of struct){
					Level.setTile(i[0], i[1], i[2], i[3], i[4]);
				}
				break;
			case TreeType.TALL:
				var struct = [];
				for(var i of struct){
					Level.setTile(i[0], i[1], i[2], i[3], i[4]);
				}
				break;
			case TreeType.SMALL:
				var struct = [[x+(2), y+(1), z+(-1), leaf, 0], [x+(2), y+(1), z+(0), leaf, 0], [x+(2), y+(1), z+(1), leaf, 0], [x+(2), y+(1), z+(2), leaf, 0], [x+(2), y+(2), z+(-2), leaf, 0], [x+(2), y+(2), z+(-1), leaf, 0], [x+(2), y+(2), z+(0), leaf, 0], [x+(2), y+(2), z+(1), leaf, 0], [x+(1), y+(1), z+(-2), leaf, 0], [x+(1), y+(1), z+(-1), leaf, 0], [x+(1), y+(1), z+(0), leaf, 0], [x+(1), y+(1), z+(1), leaf, 0], [x+(1), y+(1), z+(2), leaf, 0], [x+(1), y+(2), z+(-2), leaf, 0], [x+(1), y+(2), z+(-1), leaf, 0], [x+(1), y+(2), z+(0), leaf, 0], [x+(1), y+(2), z+(1), leaf, 0], [x+(1), y+(2), z+(2), leaf, 0], [x+(1), y+(3), z+(-1), leaf, 0], [x+(1), y+(3), z+(0), leaf, 0], [x+(1), y+(3), z+(1), leaf, 0], [x+(1), y+(4), z+(0), leaf, 0], [x+(0), y+(0), z+(0), log, 0], [x+(0), y+(1), z+(-2), leaf, 0], [x+(0), y+(1), z+(-1), leaf, 0], [x+(0), y+(1), z+(0), log, 0], [x+(0), y+(1), z+(1), leaf, 0], [x+(0), y+(1), z+(2), leaf, 0], [x+(0), y+(2), z+(-2), leaf, 0], [x+(0), y+(2), z+(-1), leaf, 0], [x+(0), y+(2), z+(0), log, 0], [x+(0), y+(2), z+(1), leaf, 0], [x+(0), y+(2), z+(2), leaf, 0], [x+(0), y+(3), z+(-1), leaf, 0], [x+(0), y+(3), z+(0), log, 0], [x+(0), y+(3), z+(1), leaf, 0], [x+(0), y+(4), z+(-1), leaf, 0], [x+(0), y+(4), z+(0), leaf, 0], [x+(0), y+(4), z+(1), leaf, 0], [x+(-1), y+(1), z+(-2), leaf, 0], [x+(-1), y+(1), z+(-1), leaf, 0], [x+(-1), y+(1), z+(0), leaf, 0], [x+(-1), y+(1), z+(1), leaf, 0], [x+(-1), y+(1), z+(2), leaf, 0], [x+(-1), y+(2), z+(-2), leaf, 0], [x+(-1), y+(2), z+(-1), leaf, 0], [x+(-1), y+(2), z+(0), leaf, 0], [x+(-1), y+(2), z+(1), leaf, 0], [x+(-1), y+(2), z+(2), leaf, 0], [x+(-1), y+(3), z+(0), leaf, 0], [x+(-1), y+(4), z+(0), leaf, 0], [x+(-2), y+(1), z+(-1), leaf, 0], [x+(-2), y+(1), z+(0), leaf, 0], [x+(-2), y+(1), z+(1), leaf, 0], [x+(-2), y+(1), z+(2), leaf, 0], [x+(-2), y+(2), z+(-1), leaf, 0], [x+(-2), y+(2), z+(0), leaf, 0], [x+(-2), y+(2), z+(1), leaf, 0], [x+(-2), y+(2), z+(2), leaf, 0]];
				for(var i of struct){
					Level.setTile(i[0], i[1], i[2], i[3], i[4]);
				}
				break;
			case TreeType.SLANTED:
				var struct = [[x+(35), y+(3), z+(-20), leaf, 0], [x+(35), y+(3), z+(-19), leaf, 0], [x+(35), y+(3), z+(-18), leaf, 0], [x+(36), y+(3), z+(-21), leaf, 0], [x+(36), y+(3), z+(-20), leaf, 0], [x+(36), y+(3), z+(-19), leaf, 0], [x+(36), y+(3), z+(-18), leaf, 0], [x+(36), y+(3), z+(-17), leaf, 0], [x+(36), y+(4), z+(-20), leaf, 0], [x+(36), y+(4), z+(-19), leaf, 0], [x+(36), y+(4), z+(-18), leaf, 0], [x+(36), y+(6), z+(-19), leaf, 0], [x+(36), y+(6), z+(-18), leaf, 0], [x+(36), y+(6), z+(-17), leaf, 0], [x+(36), y+(6), z+(-16), leaf, 0], [x+(36), y+(6), z+(-15), leaf, 0], [x+(37), y+(3), z+(-21), leaf, 0], [x+(37), y+(3), z+(-20), leaf, 0], [x+(37), y+(3), z+(-19), log, 0], [x+(37), y+(3), z+(-18), leaf, 0], [x+(37), y+(3), z+(-17), leaf, 0], [x+(37), y+(4), z+(-20), leaf, 0], [x+(37), y+(4), z+(-19), leaf, 0], [x+(37), y+(4), z+(-18), leaf, 0], [x+(37), y+(6), z+(-20), leaf, 0], [x+(37), y+(6), z+(-19), leaf, 0], [x+(37), y+(6), z+(-18), leaf, 0], [x+(37), y+(6), z+(-17), leaf, 0], [x+(37), y+(6), z+(-16), leaf, 0], [x+(37), y+(6), z+(-15), leaf, 0], [x+(37), y+(6), z+(-14), leaf, 0], [x+(37), y+(7), z+(-17), leaf, 0], [x+(38), y+(2), z+(-19), log, 0], [x+(38), y+(3), z+(-21), leaf, 0], [x+(38), y+(3), z+(-20), leaf, 0], [x+(38), y+(3), z+(-19), leaf, 0], [x+(38), y+(3), z+(-18), leaf, 0], [x+(38), y+(3), z+(-17), leaf, 0], [x+(38), y+(4), z+(-20), leaf, 0], [x+(38), y+(4), z+(-19), leaf, 0], [x+(38), y+(4), z+(-18), leaf, 0], [x+(38), y+(6), z+(-20), leaf, 0], [x+(38), y+(6), z+(-19), leaf, 0], [x+(38), y+(6), z+(-18), leaf, 0], [x+(38), y+(6), z+(-17), leaf, 0], [x+(38), y+(6), z+(-16), leaf, 0], [x+(38), y+(6), z+(-15), leaf, 0], [x+(38), y+(6), z+(-14), leaf, 0], [x+(38), y+(7), z+(-18), leaf, 0], [x+(38), y+(7), z+(-17), leaf, 0], [x+(38), y+(7), z+(-16), leaf, 0], [x+(39), y+(0), z+(-19), log, 0], [x+(39), y+(1), z+(-19), log, 0], [x+(39), y+(2), z+(-19), log, 0], [x+(39), y+(3), z+(-20), leaf, 0], [x+(39), y+(3), z+(-19), leaf, 0], [x+(39), y+(3), z+(-18), log, 0], [x+(39), y+(4), z+(-17), log, 0], [x+(39), y+(5), z+(-17), log, 0], [x+(39), y+(6), z+(-20), leaf, 0], [x+(39), y+(6), z+(-19), leaf, 0], [x+(39), y+(6), z+(-18), leaf, 0], [x+(39), y+(6), z+(-17), log, 0], [x+(39), y+(6), z+(-16), leaf, 0], [x+(39), y+(6), z+(-15), leaf, 0], [x+(39), y+(6), z+(-14), leaf, 0], [x+(39), y+(7), z+(-19), leaf, 0], [x+(39), y+(7), z+(-18), leaf, 0], [x+(39), y+(7), z+(-17), leaf, 0], [x+(39), y+(7), z+(-16), leaf, 0], [x+(39), y+(7), z+(-15), leaf, 0], [x+(40), y+(6), z+(-20), leaf, 0], [x+(40), y+(6), z+(-19), leaf, 0], [x+(40), y+(6), z+(-18), leaf, 0], [x+(40), y+(6), z+(-17), leaf, 0], [x+(40), y+(6), z+(-16), leaf, 0], [x+(40), y+(6), z+(-15), leaf, 0], [x+(40), y+(6), z+(-14), leaf, 0], [x+(40), y+(7), z+(-18), leaf, 0], [x+(40), y+(7), z+(-17), leaf, 0], [x+(40), y+(7), z+(-16), leaf, 0], [x+(41), y+(6), z+(-20), leaf, 0], [x+(41), y+(6), z+(-19), leaf, 0], [x+(41), y+(6), z+(-18), leaf, 0], [x+(41), y+(6), z+(-17), leaf, 0], [x+(41), y+(6), z+(-16), leaf, 0], [x+(41), y+(6), z+(-15), leaf, 0], [x+(41), y+(6), z+(-14), leaf, 0], [x+(41), y+(7), z+(-17), leaf, 0], [x+(42), y+(6), z+(-19), leaf, 0], [x+(42), y+(6), z+(-18), leaf, 0], [x+(42), y+(6), z+(-17), leaf, 0], [x+(42), y+(6), z+(-16), leaf, 0], [x+(42), y+(6), z+(-15), leaf, 0]];
				for(var i of struct){
					Level.setTile(i[0], i[1], i[2], i[3], i[4]);
				}
				break;
			case TreeType.FAT:
				var struct = [[x+(3), y+(6), z+(-3), leaf, 0], [x+(3), y+(6), z+(-2), leaf, 0], [x+(3), y+(6), z+(-1), leaf, 0], [x+(3), y+(6), z+(0), leaf, 0], [x+(3), y+(7), z+(-3), leaf, 0], [x+(3), y+(7), z+(-2), leaf, 0], [x+(3), y+(7), z+(-1), leaf, 0], [x+(3), y+(7), z+(0), leaf, 0], [x+(3), y+(7), z+(1), leaf, 0], [x+(2), y+(6), z+(-4), leaf, 0], [x+(2), y+(6), z+(-3), leaf, 0], [x+(2), y+(6), z+(-2), leaf, 0], [x+(2), y+(6), z+(-1), leaf, 0], [x+(2), y+(6), z+(0), leaf, 0], [x+(2), y+(6), z+(1), leaf, 0], [x+(2), y+(6), z+(2), leaf, 0], [x+(2), y+(7), z+(-3), leaf, 0], [x+(2), y+(7), z+(-2), leaf, 0], [x+(2), y+(7), z+(-1), leaf, 0], [x+(2), y+(7), z+(0), leaf, 0], [x+(2), y+(7), z+(1), leaf, 0], [x+(2), y+(8), z+(-1), leaf, 0], [x+(2), y+(8), z+(0), leaf, 0], [x+(1), y+(5), z+(-2),  log, 0], [x+(1), y+(5), z+(-1),  log, 0], [x+(1), y+(6), z+(-4), leaf, 0], [x+(1), y+(6), z+(-3), leaf, 0], [x+(1), y+(6), z+(-2),  log, 0], [x+(1), y+(6), z+(-1),  log, 0], [x+(1), y+(6), z+(0), leaf, 0], [x+(1), y+(6), z+(1), leaf, 0], [x+(1), y+(6), z+(2), leaf, 0], [x+(1), y+(6), z+(3), leaf, 0], [x+(1), y+(7), z+(-4), leaf, 0], [x+(1), y+(7), z+(-3), leaf, 0], [x+(1), y+(7), z+(-2), leaf, 0], [x+(1), y+(7), z+(-1), leaf, 0], [x+(1), y+(7), z+(0), leaf, 0], [x+(1), y+(7), z+(1), leaf, 0], [x+(1), y+(7), z+(2), leaf, 0], [x+(1), y+(7), z+(3), leaf, 0], [x+(1), y+(8), z+(-2), leaf, 0], [x+(1), y+(8), z+(-1), leaf, 0], [x+(1), y+(8), z+(0), leaf, 0], [x+(1), y+(8), z+(1), leaf, 0], [x+(0), y+(0), z+(-1),  log, 0], [x+(0), y+(0), z+(0),  log, 0], [x+(0), y+(1), z+(-1),  log, 0], [x+(0), y+(1), z+(0),  log, 0], [x+(0), y+(2), z+(-1),  log, 0], [x+(0), y+(2), z+(0),  log, 0], [x+(0), y+(3), z+(-1),  log, 0], [x+(0), y+(3), z+(0),  log, 0], [x+(0), y+(4), z+(-1),  log, 0], [x+(0), y+(4), z+(0),  log, 0], [x+(0), y+(4), z+(1),  log, 0], [x+(0), y+(5), z+(-1),  log, 0], [x+(0), y+(5), z+(0),  log, 0], [x+(0), y+(5), z+(1),  log, 0], [x+(0), y+(6), z+(-4), leaf, 0], [x+(0), y+(6), z+(-3), leaf, 0], [x+(0), y+(6), z+(-2), leaf, 0], [x+(0), y+(6), z+(-1),  log, 0], [x+(0), y+(6), z+(0),  log, 0], [x+(0), y+(6), z+(1),  log, 0], [x+(0), y+(6), z+(2), leaf, 0], [x+(0), y+(6), z+(3), leaf, 0], [x+(0), y+(7), z+(-4), leaf, 0], [x+(0), y+(7), z+(-3), leaf, 0], [x+(0), y+(7), z+(-2), leaf, 0], [x+(0), y+(7), z+(-1),  log, 0], [x+(0), y+(7), z+(0),  log, 0], [x+(0), y+(7), z+(1), leaf, 0], [x+(0), y+(7), z+(2), leaf, 0], [x+(0), y+(7), z+(3), leaf, 0], [x+(0), y+(8), z+(-3), leaf, 0], [x+(0), y+(8), z+(-2), leaf, 0], [x+(0), y+(8), z+(-1), leaf, 0], [x+(0), y+(8), z+(0), leaf, 0], [x+(0), y+(8), z+(1), leaf, 0], [x+(0), y+(8), z+(2), leaf, 0], [x+(-1), y+(0), z+(-1),  log, 0], [x+(-1), y+(0), z+(0),  log, 0], [x+(-1), y+(1), z+(-1),  log, 0], [x+(-1), y+(1), z+(0),  log, 0], [x+(-1), y+(2), z+(-1),  log, 0], [x+(-1), y+(2), z+(0),  log, 0], [x+(-1), y+(3), z+(-1),  log, 0], [x+(-1), y+(3), z+(0),  log, 0], [x+(-1), y+(4), z+(-1),  log, 0], [x+(-1), y+(4), z+(0),  log, 0], [x+(-1), y+(5), z+(-1),  log, 0], [x+(-1), y+(5), z+(0),  log, 0], [x+(-1), y+(6), z+(-4), leaf, 0], [x+(-1), y+(6), z+(-3), leaf, 0], [x+(-1), y+(6), z+(-2), leaf, 0], [x+(-1), y+(6), z+(-1),  log, 0], [x+(-1), y+(6), z+(0),  log, 0], [x+(-1), y+(6), z+(1), leaf, 0], [x+(-1), y+(6), z+(2), leaf, 0], [x+(-1), y+(6), z+(3), leaf, 0], [x+(-1), y+(7), z+(-4), leaf, 0], [x+(-1), y+(7), z+(-3), leaf, 0], [x+(-1), y+(7), z+(-2), leaf, 0], [x+(-1), y+(7), z+(-1),  log, 0], [x+(-1), y+(7), z+(0),  log, 0], [x+(-1), y+(7), z+(1), leaf, 0], [x+(-1), y+(7), z+(2), leaf, 0], [x+(-1), y+(7), z+(3), leaf, 0], [x+(-1), y+(8), z+(-3), leaf, 0], [x+(-1), y+(8), z+(-2), leaf, 0], [x+(-1), y+(8), z+(-1), leaf, 0], [x+(-1), y+(8), z+(0), leaf, 0], [x+(-1), y+(8), z+(1), leaf, 0], [x+(-1), y+(8), z+(2), leaf, 0], [x+(-2), y+(3), z+(-2),  log, 0], [x+(-2), y+(4), z+(-2),  log, 0], [x+(-2), y+(5), z+(-2),  log, 0], [x+(-2), y+(5), z+(0),  log, 0], [x+(-2), y+(6), z+(-4), leaf, 0], [x+(-2), y+(6), z+(-3), leaf, 0], [x+(-2), y+(6), z+(-2),  log, 0], [x+(-2), y+(6), z+(-1), leaf, 0], [x+(-2), y+(6), z+(0),  log, 0], [x+(-2), y+(6), z+(1), leaf, 0], [x+(-2), y+(6), z+(2), leaf, 0], [x+(-2), y+(7), z+(-4), leaf, 0], [x+(-2), y+(7), z+(-3), leaf, 0], [x+(-2), y+(7), z+(-2), leaf, 0], [x+(-2), y+(7), z+(-1), leaf, 0], [x+(-2), y+(7), z+(0), leaf, 0], [x+(-2), y+(7), z+(1), leaf, 0], [x+(-2), y+(7), z+(2), leaf, 0], [x+(-2), y+(7), z+(3), leaf, 0], [x+(-2), y+(8), z+(-2), leaf, 0], [x+(-2), y+(8), z+(-1), leaf, 0], [x+(-2), y+(8), z+(0), leaf, 0], [x+(-2), y+(8), z+(1), leaf, 0], [x+(-3), y+(6), z+(-4), leaf, 0], [x+(-3), y+(6), z+(-3), leaf, 0], [x+(-3), y+(6), z+(-2), leaf, 0], [x+(-3), y+(6), z+(-1), leaf, 0], [x+(-3), y+(6), z+(0), leaf, 0], [x+(-3), y+(6), z+(1), leaf, 0], [x+(-3), y+(6), z+(2), leaf, 0], [x+(-3), y+(7), z+(-4), leaf, 0], [x+(-3), y+(7), z+(-3), leaf, 0], [x+(-3), y+(7), z+(-2), leaf, 0], [x+(-3), y+(7), z+(-1), leaf, 0], [x+(-3), y+(7), z+(0), leaf, 0], [x+(-3), y+(7), z+(1), leaf, 0], [x+(-3), y+(7), z+(2), leaf, 0], [x+(-3), y+(7), z+(3), leaf, 0], [x+(-3), y+(8), z+(-1), leaf, 0], [x+(-3), y+(8), z+(0), leaf, 0], [x+(-4), y+(6), z+(-3), leaf, 0], [x+(-4), y+(6), z+(-2), leaf, 0], [x+(-4), y+(6), z+(-1), leaf, 0], [x+(-4), y+(6), z+(0), leaf, 0], [x+(-4), y+(6), z+(1), leaf, 0], [x+(-4), y+(7), z+(-3), leaf, 0], [x+(-4), y+(7), z+(-2), leaf, 0], [x+(-4), y+(7), z+(-1), leaf, 0], [x+(-4), y+(7), z+(0), leaf, 0], [x+(-4), y+(7), z+(1), leaf, 0]];
				for(var i of struct){
					Level.setTile(i[0], i[1], i[2], i[3], i[4]);
				}
		}
	}
};

Block.setTree = function(IDs, type, time, treeType){
	if(typeof IDs === 'Array'){
		var t = type.replace(/\s/g, "_");
		var txt = t.toLowerCase();
		Block.defineBlock(IDs[0], type + " Log", [
			[txt + "_log_top", 0], [txt + "_log_top", 0], [txt + "log_side", 0], [txt + "log_side", 0], [txt + "log_side", 0], [txt + "log_side", 0]
			], 5, false, 0);
		Block.defineBlock(IDs[1], type + " Leave", [txt + "_leave", 0], 2, false, 0);
		Block.setRenderLayer(IDs[1], .00000000001);
		Block.defineBlock(IDs[2], type + " Sapling", [txt + "_sapling", 0], 3, false, 1);
		Tree.constructor.push({
			logId: IDs[0],
			leafId: IDs[1],
			sapling: IDs[2],
			time: time,
			type: treeType
		})
	} else {
		return;
	}
};

function replaceDirt(x, y, z){
	var sides = [[x - 1, y, z], [x + 1, y, z], [x, y, z - 1], [x, y, z + 1]];
	for(var i of sides){
		if(Level.getTile(i[0], i[1], i[2]) == 2 || Level.getTile(i[0], i[1], i[2]) == 3){
			Level.setTile(i[0], i[1], i[2], Level.getTile(i[0], i[1], i[2]), Level.getData(i[0], i[1], i[2]));
		}
	}
}