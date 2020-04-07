## Testing
Testing involved viewing the website myself on a range of devices both in Chrome Dev tools and on physical Iphone, tablet and desktop devices.
As part of the testing procedure my peers reviewed the website and provided constructive comments.

In each of the main sections; Home, Results table and Results map the required information has been provided and is accessible to the end user.
The layout of information expands into side by side columns on medium sized screens and above.
The font also increases slightly on medium screens sizes and above to provide easier to read text.
The functionality of these media queries has been tested across all devices using Chrome Devtools.

The functionality of the search form has been tested by inputting band and city information across a range of dates.
**Google autocomplete API** has been used to specifically prevent a user from inputting an incorrect city location.
The date from and date to calendars have been designed so that once a date from has been selected all dates previous in time to this are disabled.
This prevents a user selecting erroneous dates. The user cannot submit the search form by pressing the search button without including the required artist / city and date information.
Form validation has also been inlcuded which prevents the user from submitting the form without including the necessary information.

The functionality of Find and Play buttons has been tested by selecting these functions across a range of screen sizes.

The responsiveness of the website has been tested across a range of devices (Galaxy S5, Iphone 5/6/7/8/X, IPad, IPad Pro and Desktop PC) using Chrome Dev tools.
The responsive design was also physically tested on personal Iphone, IPad, desktop and widescreen monitor devices.

W3C CSS & HTML Validators and ICI wen accessibilty checker were used to check the validity and formatting of code.

Fellow student feedback was also key to the testing procedure where other course participants provided me with some valuable tips. 
This advice included updating my google marker image file path as it was incorrectly linked and the check the opaque overlay of the background image on mbile screen sizes.

### Responsiveness
* **Plan:** The website needed to respond to different device sizes and to device orientation.
* **Implementation:** Bootstrap was employed to undertake a mobile first design with grid elements which change orientation based on screen width. I also created media queries to change the size of text at different screen sizes.
* **Result:** On small devices and medium to large devices the website responds well and the images and text can be easily viewed.
* **Verdict:** This test has passed and the site is responsive.

### Design
* **Plan:** The design of the site needs to be eye catching, give the user the feel of being at a gig and be simplistic.
* **Implementation:** A full background image of a gig gives the user the sense of being in the crowd at a gig. A compact, simple search form reduces clutter and makes the site easy to use.
* **Result:** The website catches the eye without overwhelming the user and provides a simple to use search form.
* **Verdict:** This test has passed.

### Search form
* **Plan:** I wanted to use a search form which is easy to use and is self-explanatory for the user by adding in prompts where necessary
* **Implementation:** The form prompts the user to choose a search category, either a city or artist. If the user chooses city the next user input field uses **Google autocomplete API** to auto complete the city name. The date from and date to fields are restricted to date choices starting from today and the date to user input cannot be prior to the date from choice.
* **Result:** The user is guided through the search process with prompts and a city autocomplete. The city autocomplete helps to prevent incorrect city information being added by the user. The date fields are restricted so that a date previous to today cannot be inserted and a date to field cannot be added which is prior to the date from field.
* **Verdict:** This test has passed.

### Results table
* **Plan:** To include a **Google map** which display the location of the gigs in the results table at specific **Google markers**. Multiple markers will be clustered together to improve the map visibility.
* **Implementation:** The **Google map** has been added with **Google markers** for each location.
* **Result:** The map displays the required information.  The map updates, pans and zooms to fit new locations as the search results are updated.
* **Verdict:** The test has passed.

### Find button
* **Plan:** Provide the user with a way of interacting with the results data and provide a simple way for the user to find the exact location of each event.
* **Implementation:** Add an event listener to check for clicks on the find icon, once this takes place use the relevant event longitude and latitude to zoom the **Google map**.
* **Result:** When clicked the find button zooms to each marker location to provide the user with a detailed view.
* **Verdict:** This section has passed the test.

### Play button
* **Plan:** Provide the user with a way of interacting with the results data and provide a simple way for the user to listen to an artist's **YouTube** playlist. The user can then easily decide if this gig is of further interest to them.
* **Implementation:** Add an event listener to check for clicks on the play icon, once this takes place use the relevant artist name to search the **YouTube** API for a playlist and open this playlist video in a modal.
* **Result:** When clicked the play button opens a modal which contains the artist's playlist. The playlist can be shuffled forwards, backwards, stopped using the **YouTube** controls and the modal can be closed by the user when needed.
* **Verdict:** This section has passed the test.

### Social media
* **Plan:** Include social media links for the Go 2 Gigs website and include the necessary Songkick affiliate logo which is required by Songkick when using their API information.
* **Implementation:** Social media links have been added to the footer of the site.
* **Result:** The links stand out on the footer.
* **Verdict:** This element of the website has passed this test.

## Bugs
Bug: The standard Boostrap form validation would not work on the date fields and would not clear on form reset. Validation plug ins would not clear after from reset either.
Fix: I wrote my own form validation javascript to resolve this issue.
Verdict: Form validation works properly and validation errors are cleared after form reset

Bug: On closing modal the **Youtube** playlist continued to play
Fix: I have included a javascript event handler to close the **Youtube** player when modal is closed
Verdict: This solution works

Bug: The Bootstrap data table last row was overflowing the table but only when the first search is performed
Fix: In style.css I have overloaded the data table properties to overcome these display issues
Verdict: The table data now display properly when first search is performed.

Bug: If a user searches for gigs in their area some smaller, relatively unknown artists can sometimes be diplayed in the list.
If the user then clicks on the Play button for this smaller artist **Youtube** does not always have a playlist for this artist and instead can display
another artist or track with a similar name.
Fix: I have investigated the **YouTube** playlist object returned by the API fetch call to see if there is a popularity rating for the playlist or some other
way of filtering the playlist to ensure that the correct playlist is found but this data does not exist in the playlist object.
Verdict: This bug still exists.

Bug: When the user performs an artist search the autocomplete city is not required. A clear instance listener is included in the script file to diable this autocomplete functionality
when searching by artist. This clear instance throws an error to the console.
Verdict: THis bug still exists.