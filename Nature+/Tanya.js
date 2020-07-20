//In dedication of Tanya Rose's birds <3
ModPE.setItem(3420, "heart", 0, "<3", 16);
Item.setCategory(3420, ItemCategory.TOOL);
Item.addShapedRecipe(3420, 2, 0, ["ddd", "dgd", "ddd"], ["d", 264, 0, "g", 266, 0]);

function useItem(x, y, z, itemId, blockId, side, itemDat, blockDat){
	if(itemId == 3420){
		var rnd = Math.floor(Math.random() * 2);
		if(rnd == 0){
			var Loki = Level.spawnMob(x, y, z, EntityType.BAT, "Loki.png");
			Entity.setMaxHealth(Loki, 1000000000000000000000000000000000000000000000000000);
			Entity.setHealth(Loki, Entity.getMaxHealth(Loki));
			Entity.setNameTag(ChatColor.GREEN + "Loki");
		}
		else if(rnd == 1){
			var Monday = Level.spawnMob(x, y, z, EntityType.BAT, "Monday.png");
			Entity.setMaxHealth(Monday, 1000000000000000000000000000000000000000000000000000);
			Entity.setHealth(Monday, Entity.getMaxHealth(Monday));
			Entity.setNameTag(ChatColor.WHITE + "Monday");
		}
	}
}

function attackHook(m, v){
	if(Entity.getMobSkin(v) == "Loki.png" || Entity.getMobSkin(v) == "Monday.png"){
		clientMessage("Hello <3");
		Player.addItemInventory(264, 64, 0);
	}
}
