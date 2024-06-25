# Survey Builder (***User***)

## Basics
o-RDS comes with a `Survey Builder` in order to create your surveys. It is a powerful tool that makes it easy to build the perfect survey for you. The `Survey Builder` contains quite a few features in order to help you achieve that. Let's dive into how the `Survey Builder` works.

***If you are a developer, documentation related to implementing new features can be found here***

## Survey Builder Structure
The `Survey Builder` consists of 5 main parts. These parts are: the questions preview, the question settings sidebar, the survey settings, the top status bar, and the publish modal. Each of these parts serve an important role in make the `Survey Builder` run.

### The Question Preview
The first main part you will learn about is the `Question Preview` section. In this section you will see all the questions you have created as well as a button to add questions. This will give you a quick indicator as to what your survey will be like. Let's dive into the questions themselves

#### The Questions
Currently there are 4 types of questions implemented in o-RDS. These include `Multiple Choice`, `Checkbox`, `Fill in the Blank`, and `Short Answer`. These are the 4 questions you'll see when building a survey. You can switch between what question is currently being edited by clicking on the question itself. When you hover over a question, the border with highlight in orange and the once a question is selected it will have an orange border permanently. Additionally, the question's settings will be displayed on the left. 

If you have multiple questions you can change the order of the questions. To do this there are two arrows in the top right portion of a question. The `up` arrow moves the question up one spot, the `down` arrow moves the question down one spot. 

A button that is also in the top right of a question is the delete button. This button will remove the question from the survey forever. `If you accidently remove a question there is no way to recover it!`

### Configuration Sidebar
The `Configuration Sidebar` is where all question editing is done. There are two categories of options based on which question you have selected. All questions contain the `General` category. This category includes all options that every question will have including `Page Number`, `Required`, and the `Question Prompt`. `Page Number` changes which page a question will appear on during the survey. `Required` allows you to choose whether you want to make a question required or not. Finally, `Question Prompt` provides a place for you to add or edit your question's question. `Checkbox` questions currently don't have the ability to be required due to the current implemention, however this will be changed in the future. 

The other category that exists is the `Answers` category. This category is only available on `Checkbox` and `Multiple Choice` questions as the options included in it relate to the choices these questions possess. The answers category includes the fields `Number of Choices` and `Current Choices`. `Number of Choices` allows you to pick the number of choices you want for each question, while the `Current Choices` option allow you to edit your current choices. 

All changes to a question from the sidebar are done in realtime and are instant. 

### The Status Bar
`The Status Bar` (Shown at the top of the page, beneath the main navigation) provides a quick overview as to the status of your survey as well as providing navigation to the results page of your survey. `The Status Bar` contains the following items: `Survey Name`, `Save Button`, `Settings Button`, `Survey Status`, `Survey Results Button`, and `Publish Button`. 

### Survey Settings
The `Survey Settings` is where you will adjust the (mostly) unseen parts of the survey. There are 6 categories of settings and they include `General`, `Appearance`, `Contact`, `Informed Consent`, `Tremendous` and `Referral`. Each category controls a different aspect of the survey, giving you a lot of control over it. 

#### General
The General Settings contain the most basic settings for a survey. The settings include the following:

***Survey Name*** - Place for you to edit the name of your survey

***Researcher Message*** - Place to edit the introductory message your survey has

***End of Survey Message*** - Place to edit the message that was shown once a survey has been completed. 

***Add Admin*** - Use this to add an admin to a survey. Adding an admin will allow that person to view and edit the survey.

#### Appearance
The appearance settings allow you to edit the primary and accent colors for your survey. The settings include the following:

***Primary Color*** - Edit the primary color for your survey

***Accent Color*** - Edit the accent color for your survey

#### Contact
The contact settings allow you to edit the contact information that is found in the contact menu within a survey. The settings include the following:

***Phone Number*** - Edit the primary phone number a researcher can be reached at regarding questions about the survey

***Email*** - Edit the email address a researcher can be reached at regarding questions about the survey

***Mailing Address*** - Edit the mailing address a researcher can be reached at regarding questions about the survey

#### Informed Consent
The informed consent settings allow you to edit the message and items displayed on the informed consent page. The settings include the following:

***Informed Consent Message*** - Edit the message you want shown as you consent to a survey

***Informed Consent Requirements*** - Edit the message to convey Informed connsent reqiorements to a participant

#### Tremendous
The Tremendous settings allow you to edit which funding source you'll be using and what campaign you are using. The settings include the following:

***Funding Source*** - Edit which funding source you want to use to pay for referral payments

***Campaign*** - Edit which campaign you want to use in order to add flair to your payments

#### Referral



### Publish Modal