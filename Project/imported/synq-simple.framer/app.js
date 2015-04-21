myLayers = Framer.Importer.load("imported/synq-simple")

//Initial Clean up
mainScreen = myLayers.MainScreen
mainScreen.x = 0
mainScreen.y = 0
mainScreen.backgroundColor = "#FFFFFF"

alphabeticList = myLayers.AlphabeticList
alphabeticList.scroll = true
contacts = myLayers.A.subLayers.concat(myLayers.B.subLayers)
inviteForm = myLayers.CreateEventInviteForm
inviteFormConfirm = myLayers.SendEventInviteConfirm
mutualAvailability = myLayers.MutualAvailabilityView

inviteForm.visible = false
inviteFormConfirm.visible = false
inviteForm.backgroundColor = "#FFFFFF"
mutualAvailability.backgroundColor = "#FFFFFF"
mutualAvailability.visible = false

//CalenderIcon Flow
calendarIcon = new Layer({backgroundColor:"#72ffc6", x: 0, y: 0,
			  width: 50, height: 50})
calendarIcon.draggable.enabled = true
calendarIcon.visible = false
calendarIcon.on(Events.DragMove, function name(Events, layer) {
    mutualAvailability.visible = true
})

calendarIcon.on(Events.DragEnd, function name(event, layer) {
    mutualAvailability.visible = false
    calendarIcon.visible = false
    inviteForm.visible = true
})

for (i = 0; i < contacts.length; i++) {
    contact = contacts[i]
    contact.on(Events.TouchStart, function (event, layer) {
	mutualAvailability.visible = true
	calendarIcon.visible = true
	calendarIcon.x = event.x
	calendarIcon.y = event.y
	calendarIcon.draggable._touchStart(event)
    }) 
}

