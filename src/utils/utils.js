
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
			"isChildrens": form.rooms.childrensroom,
			"isBedroom": form.rooms.bedroom,
			"isHallway": form.rooms.hallway,
			"isKitchen": form.rooms.kitchen,
			"isLivingRoom": form.rooms.livingroom,
			"isWardrobe": form.rooms.wardrobe,
			"isWc": form.rooms.bathroom,
			"wish": form.rooms.advanced
		},
		filesId: files
	}

	if (form.questionnaire.childrensAge) { data.orderPageOneRequest.ageOfKids = form.questionnaire.childrensAge }
	if (form.questionnaire.childrensCount) { data.orderPageOneRequest.numberOfKids = form.questionnaire.childrensCount }
	return data;
}
