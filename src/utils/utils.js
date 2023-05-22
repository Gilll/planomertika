
export const getData = (form, files) => {
	let data = {
		orderPageOneRequest: {
			"age": form.questionnaire.age,
			"kids": form.questionnaire.childrens,
			"guess": form.questionnaire.guests,
			'numberOfGuess': form.questionnaire.guestsCount,
			"peoples": form.questionnaire.tenantsCount,
			"pets": form.questionnaire.pet
		},
		orderPageTwoRequest: {
			"isCabinet": form.rooms.cabinet,
			"isCabinetWithBed": form.rooms.сabinetWithBed,
			"isChildrens": form.rooms.childrensroom,
			"isChildrensWithDressingRoom": form.rooms.childrensWithDressingRoom,
			"isBedroom": form.rooms.bedroom,
			"isBedroomWithDressingRoom": form.rooms.bedroomWithDressingRoom,
			"isHallway": form.rooms.hallway,
			"isKitchen": form.rooms.kitchen,
			"isLivingRoom": form.rooms.livingroom,
			"isWardrobe": form.rooms.wardrobe,
			"isWc": form.rooms.bathroom,
			"isDinningRoom": form.rooms.dinningRoom,
			"isGuestBedroom": form.rooms.guestBedroom,
			"isGuestBedroomWithDressingRoom": form.rooms.guestBedroomWithDressingRoom,
			"isGuestWc": form.rooms.guestWc,
			"isGuestWcWithShower": form.rooms.guestWcWithShower,
			"isKitchenDinningRoom": form.rooms.kitchenDinningRoom,
			"isKitchenLivingRoom": form.rooms.kitchenLivingRoom,
			"isPantry": form.rooms.pantry,
			"isWcWithBath": form.rooms.bathroomWithBath,
			"isWcWithShower": form.rooms.bathroomWithShower,
			"wish": form.rooms.advanced
		},
		filesId: files
	}

	if (form.questionnaire.childrensAge) { data.orderPageOneRequest.ageOfKids = form.questionnaire.childrensAge }
	if (form.questionnaire.childrensCount) { data.orderPageOneRequest.numberOfKids = form.questionnaire.childrensCount }
	return data;
}
