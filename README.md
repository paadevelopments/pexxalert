![](/rep_res/lib_banner.png)
With 5 Fully customizable templates🎨.

## Template Designs
### Alert
![](/rep_res/lib_srn_sh1.png)
### Confirm
![](/rep_res/lib_srn_sh2.png)
### Progress
![](/rep_res/lib_srn_sh3.png)
### Input
![](/rep_res/lib_srn_sh4.png)
### Call
![](/rep_res/lib_srn_sh5.png)

##
##

# Getting Started [ installation ]
## 1. By Source Reference
```
<head>
<link rel="stylesheet" type="text/css" href="path-to-css/pexxalert.min.css">
<script type="text/javascript" src="path-to-js/jquery.js"></script>
<script type="text/javascript" src="path-to-js/pexxalert.min.js"></script>
</head>
```
## 2. Via NPM
**Step 1.** Install both pexxalert and jquery via Node CLI.
```
npm i pexxalert jquery
```
**Step 2.** Import.
```
import 'pexxalert/dist/pexxalert.min.css';
import $ from 'jquery';
import pexxalert from 'pexxalert';
```
**Step 3.** Usage. (React App Example).
```
// window == browser window object.
var alert = new pexxalert($, window, 'alert', { anchor : '#root'});

function show_alert(event){ return alert.display({ type : 'success', message : 'All worked out.' });
}

function App(){ return ( <div className="App"><button onClick={ show_alert }>Tap Me</button></div> );
}

export default App;
```

##
# Usage
## Global Object Declaration
**NOTE:** The instantiation below is to be made once and should be done when document is ready.
**NOTE:** *$* == jquery init function. *window* == browser window object.
```
// For alert
const alert = new pexxalert($, window, 'alert', { anchor: 'body' });

// For confirm
const confirm = new pexxalert($, window, 'confirm', { anchor: 'body' });

// For progress
const progress = new pexxalert($, window, 'progress', { anchor: 'body' });

// For input
const input = new pexxalert($, window, 'input', { anchor: 'body' });

// For call
const call = new pexxalert($, window, 'call', { anchor: 'body' });
```

## Declared Object Use
**NOTE:** Use the previously declared global object anytime you want to display its related alert. All you do is to set the new alert options as a parameter for the **.display({ new options })** method. Just like it's done below.
```
// For alert
alert.display({ type : 'success', message : 'All went well' });

// For confirm
confirm.display({
   title : 'Process This?',
   message : 'This process will run and do what it has to',
   accept_label : 'Process', reject_label : 'Cancel',
   call_back : function(choice){
      // Manage choice
      if (choice == 'yes') return console.log('Yes'); console.log('No');
   }
});

// For progress
progress.display({
   title : 'Uploading image...', call_back : function(progress,element,box){
      // Manage progress hand
      $(progress).css({ 'width' : '30%' })
   }
});

// For input
input.display({
   title : 'What Is Your Favorite Fruit?', message : 'No vegetables please',
   placeholder : 'Enter a fruit', type : 'text',
   process_label : 'Submit', discard_label : 'Discard'
   call_back : function(input,choice,element){
      // Manage choice & element [ button clicked ]
      $(element).hide(); $(element).siblings().show();
      console.log(input);
   }
});

// For call
call.display({
   routing_id : 22, name : 'John', username : 'johnnyboy',
   avatar : '', type : 'video',
   call_back : function(action,routing_id,username,type){
      // Manage choice
      if (action == 'yes') { console.log('answered') }
      else { console.log('rejected') }
   }
});
```

##
# Global Object Options
| Option | Type | Default | Purpose |
| --- | --- | --- | --- |
| `anchor` | string | "body" | 	Anchor element to which all alerts are appended. Start string with "." for class selection or "#" for id selection. |
| `stack` |	boolean |	false	| Stacking alert messages against each other. **NOTE:** This option only works for both **Alert** and **Progress** templates. |
| `stack_position`| string	| "top"	| Stacking order. **NOTE:** This option only works if stacking is enabled and only supports "top" and "bottom". |
|` theme`	| boolean	| true	| Determines whether to enable dark or light mode themes. **NOTE:** This option does not rely on a browser's OS. |
| `theme_type` | string	| "snow"| Set to apply dark or light theme color palette. **NOTE:** This option only works if theme is enabled supports "snow" and "darcula". |
| `theme_backgrounds`	| object | { snow : { solid : '#FFFFFF', alpha : 'rgba(255,255,255,0.5)', color : '#363636' }, darcula : { solid : '#363636', alpha : 'rgba(54,54,61,0.5)', color : '#FFFFFF' } }	| Defines set of color palettes to be used for dark and light mode themes. **NOTE:** This option is only applicable if theme is enabled. |
| `accent`| string	| "#6671F0"	| Color to be applied to buttons and other indicators. |
| `blur` | boolean | true	| Determines whether to apply back-drop blur filter or a solid one. |
| `static_background`	| string	| "#6671F0"	| Background color for templates when theme and blur has been disabled. |
| `static_color`	| string | "#FFFFFF" | Text color for templates when theme has been disabled. |
| `static_alpha`	| string	| "rgba(102,113,240,0.5)"	| Background color for templates when theme has been disabled but blur is enabled. |
| `responsive` | boolean	| true	| Determines whether to set different positions of alert for mobile and desktop resolutions. **NOTE:** This option only applies to Alert templates. |
| `responsiveness_threshold`	| int	| 800	| Threshold to determine when to use mobile or desktop versions of the Alert template. If view width is within this value, mobile is set else desktop is set. |
| `auto_close`	| boolean	| true	| Set to enable or disable auto-close for alerts. Applies to only **Alert** templates. |
| `auto_close_speed`	| int	| 2500	| Number of seconds before alert gets auto-closed. **NOTE:** Time unit is milliseconds and applies to only **Alert** templates. |
| `landscape`	| boolean	| false	| Force set landscape for alerts. **NOTE:** This option only works when responsive is enabled and applies to Alert templates. |
| `force_padding`	| int	| 0	| Set extra top padding for alerts to get away with device status bar or notch coverage. |

# Display Method Options
## Alert
| Option | Type | Default | Purpose |
| --- | --- | --- | --- |
| `message`	| string	| "Test Message"	| Alert message text. |
| `type`	| string	| "success"	| Defines if alert message is success or an error. **NOTE:** This option only supports "success" and "error". |
| `call_back`	| function	| function	| Function triggered on alert closure.

## Alert
| Option | Type | Default | Purpose |
| --- | --- | --- | --- |
| `message`	| string	| "Test Message"	| Alert message text. |
| `type`	| string	| "success"	| Defines if alert message is success or an error. **NOTE:** This option only supports "success" and "error". |
| `call_back`	| function	| function	| Function triggered on alert closure. |

## Confirm
| Option | Type | Default | Purpose |
| --- | --- | --- | --- |
| `title`	| string	| "Run This Test?" | Context title. |
| `message`	| string	| "This process will run and do what it has to" |	Message text. |
| `accept_label`	| string	| "Yes"	| Text on acceptance button. |
| `reject_label`	| string	| "No"	| Text on rejection button. |
| `fragment` | boolean	| true	| Determines whether or not to allow URL fragmenting for template. |
| `call_back`	| function	| function	| Function triggered on choice selection. |

## Progress
| Option | Type | Default | Purpose |
| --- | --- | --- | --- |
| `title`	| string	| "Run This Test?" | Progress task label/title. |
| `call_back`	| function	| function	| Function triggered on prrogress template show. This function makes available both progress hand and element for progress manipulation. |

## Input
| Option | Type | Default | Purpose |
| --- | --- | --- | --- |
| `title`	| string | "Your Favorite Fruit?"	| Context title. |
| `message`	| string	| "No vegetables please" | Message text of requied input. |
| `placeholder`	| string	| "Enter a fruit"	| Input field placeholder. |
| `type` | string	| "text"	| Determines the accepted input type. **NOTE:** This option supports both text and number input types. |
| `process_label`	| string	| "Submit" | Text on process button. |
| `discard_label`	| string	| "Discard"	| Text on discard button. |
| `fragment` | boolean	| true	| Determines whether or not to allow URL fragmenting for template. |
| `call_back`	| function	| function	| Function triggered on input submission. **NOTE:** This fuction returns the choice selected, the selected button and input for processing. |

## Call
| Option | Type | Default | Purpose |
| --- | --- | --- | --- |
| `routing_id`	| int	| 0	| A webRTC id [ custom usage ]. |
| `name`	| string	| "John"	| Caller screen name [ custom usage ]. |
| `username` | string	| "johnney"	| Caller screen username [ custom usage ]. |
| `avatar` | string	| ""	| Caller avatar/image source URL [ custom usage ]. |
| `type`	| string	| "video"	| Call type [ custom usage ]. This option only supports "video" and "audio". |
| `call_back`	| function	| function	| Function triggered on choice selection. [ custom usage ] |

##
# Updating Global Object Options
Use the **.update({ new options })** method to update a declared global template options.

##
# Sound Source
[notificationsounds.com](https://notificationsounds.com/)

##
# Sound Effect Support
Sound effects were omitted starting from version 2.0.0.

##
# Release History
*  Initial [ v1.0.0 ]
*  11/28/2022 [ v2.0.0 ]

##
# License
MIT