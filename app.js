myLayers = Framer.Importer.load("imported/synq")

//Initial Clean up
mainScreen = myLayers.MainScreen
mainScreen.x = 0
mainScreen.y = 0
mainScreen.backgroundColor = "#FFFFFF"
overlay = myLayers.CreateEventOverlay
overlay.visible = false

alphabeticList = myLayers.AlphabeticList
//alphabeticList.scroll = true
contacts = myLayers.A.subLayers.concat(myLayers.B.subLayers)
inviteForm = myLayers.CreateEventInviteForm
inviteFormConfirm = myLayers.SendEventInviteConfirm
mutualAvailability = myLayers.MutualAvailabilityView
yesButton = myLayers.YesButton
noButton = myLayers.NoButton
sendButton = myLayers.SendEventInvite

inviteForm.visible = false
inviteFormConfirm.backgroundColor = "#FFFFFF"
inviteFormConfirm.visible = false
inviteForm.backgroundColor = "#FFFFFF"
mutualAvailability.backgroundColor = "#FFFFFF"
mutualAvailability.visible = false

widthFactor = Utils.isMobile() ? window.innerWidth / mainScreen.width : 1.0
heightFactor = Utils.isMobile() ? window.innerHeight / mainScreen.height : 1.0

// Fix height / width on iphone6
function adjustDimensions(layer) {
  layer.width *= widthFactor
  layer.height *= heightFactor
  layer.x *= widthFactor
  layer.y *= heightFactor
  for (var i = 0; i < layer.subLayers.length; i++) {
    var sublayer = layer.subLayers[i]
    adjustDimensions(sublayer)
  }
}

adjustDimensions(mainScreen)

//CalenderIcon Flow
calendarIcon = new Layer({backgroundColor:"#72ffc6", x: 0, y: 0,
			  width: 50 * widthFactor, height: 50 * heightFactor})
calendarIcon.draggable.enabled = true
calendarIcon.visible = false

yesButton.on(Events.Click, function (events, layer) {
    inviteFormConfirm.visible = false
    overlay.visible = false
})

noButton.on(Events.Click, function (events, layer) {
    inviteFormConfirm.visible = false
})

sendButton.on(Events.Click, function (events, layer) {
    inviteFormConfirm.visible = true
})

calendarIcon.on(Events.DragMove, function name(Events, layer) {
    overlay.visible = true
    mutualAvailability.visible = true
})

calendarIcon.on(Events.DragEnd, function name(event, layer) {
    if (event.layerX > 266 * widthFactor) {
	mutualAvailability.visible = false
	calendarIcon.visible = false
	inviteForm.visible = true
    } else {
	calendarIcon.visible = false
	overlay.visible = false
    }
 })

for (i = 0; i < contacts.length; i++) {
    contact = contacts[i]
    contact.on(Events.TouchStart, function (event, layer) {
	mutualAvailability.visible = true
	calendarIcon.visible = true
	calendarIcon.x = event.layerX
	calendarIcon.y = event.layerY
	calendarIcon.draggable._touchStart(event)
    }) 
}

