# kpg

OVERVIEW
========

kpg is used for generating passwords. The passwords can be 8 to 300 characters long and you can enforce minimums for lower case, upper case, numbers, and special characters.

INSTALLATION
============

npm install kpg

USAGE
=====

<code>var kpg = require('kpg');</code>

Now you can start generating passwords. If you don't pass a config object, kpg generates a 10 character password using lower case, upper case, numbers, and special characters:

// sample: 7t0@{NbJvC
var pw = kpg();

That was simple! Now let's play with the config object: Let's create a 100 character default password: Just pass in an object literal with a 'sz' property set to the number of characters you want in the password. Min=8, Max=300. It will default to 10 if you go outside these bounds.

// sample: MHp0dW}n2b@KWaKdUI$<rC5uK6U>gPj+&IpgP{#yCsp+JxuTQ^S^#UXuwx%^EME>+Z1_<K?}.NH+w&sjLM{5!B%jDBD6VQww?MR9
var pw = kpg( {sz:100} );

Let's make a 12 character password that's all lower case: Add the 'l' property for lower.

// sample: kjzfzenmiild
var pw = kpg( {sz:12, l:12} );

Let's make a 15 character password that's all upper case: Add the 'u' property for upper.

// sample: LTXCFQCJTQWNPBS
var pw = kpg( {sz:15, u:15} );

How about 8 numbers? Yup, add the 'n' property for numbers.

// sample: 09620526
var pw = kpg( {sz:8, n:8} );

Yeah, it's that easy! Let's make one with 22 special characters: You guessed it! 's' is for special characters.

// sample: }>>}&}!+_(&-}]_*}%**[(
var pw = kpg( {sz:22, s:22} );

Now let's mix 'em up. A default(10 chars) password with at least 1 lower case, 1 upper case, 3 numbers, and 2 special characters: We leave out the 'sz' because it defaults to 10 characters.

// sample: 31U^g0iHj}
var pw = kpg( {l:1, u:1, n:3, s:2} );

One more. 50 characters with at least 49 numbers and 1 upper case letter.

// sample: 3157598919001870884642163747814472527K679826584606 See the 'K' in there?
var pw = kpg( {sz:50, n:49, u:1} );

That's all there is to it! The properties can be in any order and if the number of the properties exceeds the 'sz' property, the size will grow to their sum. If you give 'sz:12' and 'n:11' and 'l:10', you will get a password with 21 characters.
