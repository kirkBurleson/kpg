# kpg

OVERVIEW
========

kpg is used for generating passwords. The passwords must be at least 1 character long, and you can enforce minimums for lower case, upper case, numbers, and special characters.

INSTALLATION
============

npm install kpg

USAGE
=====

var kpg = require('kpg');

Now you can start generating passwords. If you don't pass a config object, kpg generates a 10 character password using lower case, upper case, numbers, and special characters:

// sample: 7t0@{NbJvC<br/>
var pw = kpg();

That was simple! Now let's play with the config object. Let's make a 12 character password that's all lower case: Add the 'l' property for lower and the 'sz' property for the size in characters.<br/>

// sample: kjzfzenmiild<br/>
var pw = kpg( {sz:12, l:12} );

Let's make a 15 character password that's all upper case: Add the 'u' property for upper. NOTE: We don't have to set the size if the enforcement properties are at least the default size. The size will grow to accomodate the properties.

// sample: LTXCFQCJTQWNPBS<br/>
var pw = kpg( {sz:15, u:15} );

How about 8 numbers? Yup, add the 'n' property for numbers.

// sample: 09620526<br/>
var pw = kpg( {sz:8, n:8} );

Yeah, it's that easy! Let's make one with 22 special characters: You guessed it! 's' is for special characters.

// sample: }>>}&}!+_(&-}]_*}%**[(<br/>
var pw = kpg( {sz:22, s:22} );

Now let's mix 'em up. A default(10 chars) password with at least 1 lower case, 1 upper case, 3 numbers, and 2 special characters: We leave out the 'sz' because it defaults to 10 characters.

// sample: 31U^g0iHj}<br/>
var pw = kpg( {l:1, u:1, n:3, s:2} );

One more. 50 characters with at least 49 numbers and 1 upper case letter.

// sample: 3157598919001870884642163747814472527K679826584606 See the 'K' in there?<br/>
var pw = kpg( {sz:50, n:49, u:1} );

That's all there is to it! The properties can be in any order and if the number of the properties exceeds the 'sz' property, the size will grow to their sum. If you give 'sz:12' and 'n:11' and 'l:10', you will get a password with 21 characters.

If you're wondering about a maximum length, I've tested with a size of 10 million and it scaled at 1 second per million on an i7 3930k running Windows 8.0 and 16gb of ram, using nodeJS. Linux Mint 17.2, running in a virtualbox, took maybe a second more.

CHANGES:
========

V.3:
Minimum size changed from 8 to 1
Maximum size removed
Significantly faster at sizes of 100k+
Supports size passed as a string. // kpg("20"), instead of kpg(20);

V.2:
Introduced passing a config object in javascript
Introduced minimums for numbers, special chars, lower case, and upper case chars
