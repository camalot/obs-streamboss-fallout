# FALLOUT 76 RADS METER

This is a `skin` for the StreamLabs `stream boss` that takes donations, bits, follows, and subscriber actions, and applies `Rads` to a health bar. Once the bar is full, it will display a random Fallout 76 Mutation, then reset the health bar.


![Idle With Rads](https://i.imgur.com/3Cezukx.png)

![50 RADS](https://i.imgur.com/qs5aExl.png)

![Mutation](https://i.imgur.com/QXRrGQF.png)


## SETUP

- Go to [Stream Labs Stream Boss](https://streamlabs.com/dashboard#/streamboss) 
- Under `Manage Battle`:
    - Set the `Total Health` to `500 HP` (or what ever value you choose).
    - Set the `Mode` to `Fixed`
- Under `Settings`
    - Disable `Damage from Boss Heals`
    - Set damage per follower: `5`
    - Set damage per bit: `1`
    - Set damage per subscriber: `50`
    - Set damage per dollar donation: `100`
    - Set fade time: `0s`
    - Set Transparent Background `enabled`
    - Set Enable Custom HTML/CSS: `enabled`
- For each of the following tabs: `HTML/CSS/JS`, copy the contents of the corresponding files to those fields. 
- Save The Changes
- Copy the Widget Url and add it to OBS
