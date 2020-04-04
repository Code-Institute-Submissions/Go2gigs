<h1 align="center">Go2Gigs</h1>

This website will allow users to search for their favorite gigs by searching by location or by artist.
The website will provide a simple to use search facility where users can enter their city and receive a list of local gigs
including the date and specific location of those gigs. Users can also search by an artist name where they will receive the related gig location and date. 

The Go2Gigs website displays search results in a data table with an accompanying Google map where users can find specific gig location information.
Users can interact with the information by selecting a button in the data table which will zoom the google map to the location of that gig.
User can select another button which will open a Youtube playlist for that specific artist.
In this way the Go2Gigs website can be used to find new music which is of interest to the user by allowing users to find music in their area and to 
listen to a playlist to see if they would like to go to that gig.

## UX
### User Stories
As a user I want to easily search for local gigs in my city.
When I enter my city I want to be presented with concise information related to gigs in my city with artist name,
gig specific location and gig date.

As a user I want to search for my favourite artist and be presented with gig specific location and dates for that artist. 

As a user once I find a specific gig to attend I want to easily purchase tickets to that gig.

As a user if my favourite artist is not currently arranged to play in my city then I would like to setup an alert.
This alert will notify me via mobile phone when my favourite artist has arranged a gig in my city.

As a target user in the age range of 18 to 50 I expect that gig information is presented to me in a simple but exciting and
eye catching way. I want to feel a sample of the high energy and excitement of being at a gig while using the website.

### Strategy
The Go 2 Gigs website will provide users with an easy to use way of searching for events either by searching for their favourite artist or by searching in their city.

Users will be presented with gig information in a table ordered by date. Users can filter the data in the table for more specific information by using the table search bar.

Users will also be presented with a google map with markers at the position of each event in the results table.

For each search result the user will also have 2 buttons in the table which will provide a way for the user to interact with the data and provides a more user led experience;

* Find button; once clicked the google map will zoom into the exact location of that event
* Play button; once clicked a modal will open which contains a YouTube playlist for that event artist

This website will be aimed at a range of demographics from junior music fans aged 12 to 18, senior music fans 18 to 50. 
As a result of this wide range of users the site must be simple to use and laid out in a concise manner.

### Scope
Website key features include the following;

* Gig search form - provides users with a means of searching for gigs
    * Drop down menu to allow users to search by city or search by artist
    * User input element where users will input the artist name or city
    * User input element will use google autocomplete API to autocomplete the city name as the user inputs this information
    * Date from element where users will select the beginning search date range
    * Date to element where users will select the ending search date range

* Results Section - provides the user with search results in a data table and google map
    * Data table which displays gig information
    * Gig information displayed is; event date, artist name, city, venue, find button and play button
    * Find button which zooms the google map to that specific location
    * Play button which plays a YouTube playlist for that artist in a modal
    * Google map which displays event locations with google markers

* Footer Section - provides links to Go2Gigs social media pages and the songkick affiliate page

### Structure
I want to keep the site as minimalist and clutter free as possible so that it is easy to use for the wide ranging demographic and so users are not overwhelmed with information.
Information will be provided to users in a concise, straight forward manner.

The mobile first design will arrange information in single full width columns to allow content to be read easily.
On larger tablet and desktop display information will be arranged in additional columns using Bootstraps responsive grid design.

Information will be grouped in 3 key areas;
* Home - provides an eye catching background gig image with a simple, clutter free search form
* Results table - provides key gig information regarding dates, artist name, location, find and play features
* Results map - provides a google map with gig venue locations at specific markers

### Wireframes
![Wireframe Desktop 1](/wireframes/Go2GigsDesktop1.png)
![Wireframe Desktop 2](/wireframes/Go2GigsDesktop2.png)
![Wireframe Mobile 1](/wireframes/Go2GigsMobile1.png)
![Wireframe Mobile 2](/wireframes/Go2GigsMobile2.png)
![Wireframe Tablet 1](/wireframes/Go2GigsTablet1.png)
![Wireframe Tablet 2](/wireframes/Go2GigsTablet2.png)

### Surface
I want the colors used on the site to mimic the colors of the gig background image and to provide the user with the feel of being at a gig venue.
The perspective of the image provides the user with the sense of being in the crowd at a gig.
An opaque overlay has been used on the full background image to add to the venue feeling.
A blue highlight color has then been used to make key elements stand out on the page and to grab the attention of the user.

I have used Lato font throughout the website as it has a simplistic style.
I have used Roboto font for the main page heading as this font makes the heading stand out and grabs the users attention.

### Features to implement
Future features will include a sign up and log in section where a user could then add their favourite bands to track in their local city.
Once the band has scheduled a gig in that city the user could then receive an email or text notification.

### Technologies used
1. HTML
2. CSS
3. Javascript
4. [Bootstrap](https://getbootstrap.com/)
5. [Googel Fonts](https://fonts.google.com/)
6. [Font Awesome](https://fontawesome.com/)
7. [Auto Prefixer](https://autoprefixer.github.io/)
8. [JQuery](https://jquery.com/)
9. [Popper.js](https://popper.js.org/)
10. [Google API](https://developers.google.com/)
11. [YouTube API](https://developers.google.com/youtube/v3)
12. [Songkick API](https://www.songkick.com/developer)
13. [Bootstrap datepicker](https://github.com/uxsolutions/bootstrap-datepicker)
14. [Bootstrap table](https://bootstrap-table.com/)


## Testing
Testing involved viewing the website myself on a range of devices both in Chrome Dev tools and on physical Iphone, tablet and desktop devices.
As part of the testing procedure my peers reviewed the website and provided constructive comments.

In each of the main sections; Home, Results table and Results map the required information has been provided and is accessible to the end user.
The layout of information expands into side by side columns on medium sized screens and above.
The font also increases slightly on medium screens sizes and above to provide easier to read text.
The functionality of these media queries has been tested across all devices using Chrome Devtools.

The functionality of the search form has been tested by inputting band and city information across a range of dates.
Google autocomplete API has been used to specifically prevent a user from inputting an incorrect city location.
The date from and date to calendars have been designed so that once a date from has been selected all dates previous in time to this are disabled.
This prevents a user selecting erroneous dates. The user cannot submit the search form by pressing the search button without including the required artist / city and date information.
Form validation has also been inlcuded which prevents the user from submitting the form without including the necessary information.

The functionality of Find and Play buttons has been tested by selecting these functions across a range of screen sizes.

The responsiveness of the website has been tested across a range of devices (Galaxy S5, Iphone 5/6/7/8/X, IPad, IPad Pro and Desktop PC) using Chrome Dev tools.
The responsive design was also physically tested on personal Iphone, IPad, desktop and widescreen monitor devices.

W3C CSS & HTML Validators were used to check the validity and formatting of code.

Fellow student feedback was also key to the testing procedure where other course participants provided me with some valuable tips. This advice included ………

### Responsiveness
* Plan: The website needed to respond to different device sizes and to device orientation.
* Implementation: Bootstrap was employed to undertake a mobile first design with grid elements which change orientation based on screen width. I also created media queries to change the size of text at different screen sizes.
* Result: On small devices and medium to large devices the website responds well and the images and text can be easily viewed.
* Verdict: This test has passed and the site is responsive.

### Design
* Plan: The design of the site needs to be eye catching, give the user the feel of being at a gig and be simplistic.
* Implementation: A full background image of a gig gives the user the sense of being in the crowd at a gig. A compact, simple search form reduces clutter and makes the site easy to use.
* Result: The website catches the eye without overwhelming the user and provides a simple to use search form.
* Verdict: This test has passed.

### Search form
* Plan: I wanted to use a search form which is easy to use and is self-explanatory for the user by adding in prompts where necessary
* Implementation: The form prompts the user to choose a search category, either a city or artist. If the user chooses city the next user input field uses google autocomplete API to auto complete the city name. The date from and date to fields are restricted to date choices starting from today and the date to user input cannot be prior to the date from choice.
* Result: The user is guided through the search process with prompts and a city autocomplete. The city autocomplete helps to prevent incorrect city information being added by the user. The date fields are restricted so that a date previous to today cannot be inserted and a date to field cannot be added which is prior to the date from field.
* Verdict: This test has passed.

### Results table
* Plan: To include a google map which display the location of the gigs in the results table at specific google markers. Multiple markers will be clustered together to improve the map visibility.
* Implementation: The google map has been added with google markers for each location.
* Result: The map displays the required information.  The map updates, pans and zooms to fit new locations as the search results are updated.
* Verdict: The test has passed.

### Find button
* Plan: Provide the user with a way of interacting with the results data and provide a simple way for the user to find the exact location of each event.
* Implementation: Add an event listener to check for clicks on the find icon, once this takes place use the relevant event longitude and latitude to zoom the google map.
* Result: When clicked the find button zooms to each marker location to provide the user with a detailed view.
* Verdict: This section has passed the test.

### Play button
* Plan: Provide the user with a way of interacting with the results data and provide a simple way for the user to listen to an artist's YouTube playlist. The user can then easily decide if this gig is of further interest to them.
* Implementation: Add an event listener to check for clicks on the play icon, once this takes place use the relevant artist name to search the YouTube API for a playlist and open this playlist video in a modal.
* Result: When clicked the play button opens a modal which contains the artist's playlist. The playlist can be shuffled forwards, backwards, stopped using the YouTube controls and the modal can be closed by the user when needed.
* Verdict: This section has passed the test.

### Social media
* Plan: Include social media links for the Go 2 Gigs website and include the necessary Songkick affiliate logo which is required by Songkick when using their API information.
* Implementation: Social media links have been added to the footer of the site.
* Result: The links stand out on the footer.
* Verdict: This element of the website has passed this test.

## Bugs
### During development
* Bug: The standard Boostrap form validation would not work on the date fields and would not clear on form reset. Validation plug ins would not clear after from reset either.
* Fix: I wrote my own form validation javascript to resolve this issue.
* Verdict: Form validation works properly and validation errors are cleared after form reset

* Bug: On closing modal the Youtube playlist continued to play
* Fix: I have included a javascript event handler to close the Youtube player when modal is closed
* Verdict: This solution works

* Bug: The Bootstrap data table last row was overflowing the table but only when the first search is performed
* Fix: In style.css I have overloaded the data table properties to overcome these display issues
* Verdict: The table data now display properly when first search is performed.

### Known bugs
If a user searches for gigs in their area some smaller, relatively unknown artists can sometimes be diplayed in the list.
If the user then clicks on the Play button for this smaller artist Youtube does not always have a playlist for this artist and instead can display
another artist or track with a similar name.

## Deployment
This project was developed using the GitPod IDE, version controlled by committing to git and pushing to GitHub via the GitPod IDE.
To deploy this page to GitHub pages from its specific [GitHub repository](https://github.com/Conal84/Go2gigs) the steps followed were;

1. Scroll to the top of this GitHub page
2. In the Repositories list select Go2gigs
3. From the menu select Settings
4. Scroll down to the GitHub Pages section
5. Under Source select Master branch
6. On selecting Master branch the page is automatically refreshed, the website is now delployed
7. The link to the webpage can be found at the top of the GitHub Pages section

### How to run this project locally
To clone this project from GitHub:

1. Follow this link to the Project [GitHub repository](https://github.com/Conal84/Go2gigs)
2. Under the repository name, click "Clone or download"
3. In the Clone with HTTPs section, copy the clone URL for the repository
4. In your local IDE open the terminal
5. Change the current working directory to the location where you want the cloned directory to be made
6. Type git clone, and then paste the URL you copied in Step 3
7. Press Enter. Your local clone will be created

**This is for educational use**
