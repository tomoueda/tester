myLayers = Framer.Importer.load("imported/synq-simple")

//Initial Clean up
mainScreen = myLayers.MainScreen
mainScreen.x = 0
mainScreen.y = 0
mainScreen.backgroundColor = "#FFFFFF"

alphabeticList = myLayers.AlphabeticList
alphabeticList.scroll = true
contacts = myLayers.A.subLayers.concat(myLayers.B.subLayers)
myLayers.CreateEventInviteForm.visible = false
mutualAvailability = myLayers.MutualAvailabilityView
mutualAvailability.backgroundColor = "#FFFFFF"
mutualAvailability.visible = true
mutualAvailability.x = 0
mutualAvailability.y = 0
    
for (i = 0; i < contacts.length; i++) {
    contact = contacts[i]
    contact.on(Events.Click, function (event, layer) {
	mutualAvailability.visible = true
    })
	       
}
