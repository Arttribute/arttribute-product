import type { Topic } from "@/lib/site";

/**
 * The opening posts, written into the database the first time the site
 * connects to it. After that they are ordinary posts: edit, unfeature or
 * delete them from the admin console.
 */
export type SeedPost = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  topic: Topic;
  authorName: string;
  coverImage: string | null;
  coverAlt: string;
  status: "published";
  featured: boolean;
  featuredRank: number | null;
};

export const SEED_POSTS: SeedPost[] = [
  {
    slug: "private-local-ai-you-can-try",
    title: "We are building private, local AI, and we want you to try it",
    excerpt:
      "The Agent Commons desktop app is out as an early preview: local models for text, transcription, voice and images, with retrieval over your files. Switch off your Wi-Fi and keep using it.",
    topic: "private-ai",
    authorName: "Baranaba Mugabane",
    coverImage: null,
    coverAlt: "",
    status: "published",
    featured: true,
    featuredRank: 1,
    body: `One thing that keeps coming up in my conversations with professionals, teams and organisations about adopting AI is concern about privacy, security and protecting intellectual property.

It becomes very real when you think about the kinds of information people actually want AI to help with:

- Financial data
- Medical or health information
- Proprietary research
- Internal company documents
- Client information
- Strategy documents
- Unreleased product ideas

These are exactly the contexts where sending data to an external AI system may introduce privacy, security, compliance or intellectual property concerns.

## Run more of your AI locally

One way to reduce that risk is to run more of your AI on your own machine.

Running generative AI locally is already possible. The problem is that getting a useful local setup running can still take a lot of work: finding and configuring models, connecting different tools, setting up retrieval over your files, and getting everything to work together.

Over the past few months we have been building a fully local and private version of [Agent Commons](https://www.agentcommons.io), with generative AI running directly on your computer.

## What is in the preview

The Agent Commons desktop app is now publicly available as an early preview. Out of the box it brings together:

- Local models for text, audio transcription, voice and image generation
- Built-in retrieval over your files
- A workspace library for your files and AI-generated outputs
- The option to install and switch between other models with minimal setup

When we say local, you can test it yourself: **switch off your Wi-Fi and keep using it.** Whenever you need the cloud, you can continue your work there too.

## What comes next

It is still early, and there is plenty we are experimenting with and improving. The aim is to make private AI easier to set up and use, while giving people more control over their data, models, agents and workflows.

We are also exploring **LAN AI**, where teams and organisations use and collaborate around AI systems within their own local network, keeping data inside that environment. If that would be useful for your team, [tell us](mailto:hello@arttribute.io?subject=LAN%20AI%20for%20our%20team).

[Download the Agent Commons desktop preview](https://www.agentcommons.io/download/desktop), put the local setup to the test, and let us know what you think.`,
  },
  {
    slug: "provenance-for-human-ai-work",
    title: "Provenance for human and AI created work",
    excerpt:
      "Questions about authorship, copyright and governance depend on knowing who was involved, which tools were used and how work was made. ProvenanceKit records that chain.",
    topic: "provenance",
    authorName: "Arttribute",
    coverImage: null,
    coverAlt: "",
    status: "published",
    featured: true,
    featuredRank: 2,
    body: `As more digital content is created with generative AI, questions about authorship, copyright, intellectual property and governance are getting harder to answer.

Those questions depend on reliable information about who was involved, which tools were used, and how the work was created. In practice that information is often incomplete or missing.

## A workflow-level approach

ProvenanceKit grew out of research by Baranaba Mugabane in the AI for Sustainable Societies master's programme, which designed and evaluated a governance-oriented provenance framework for human and AI created works.

The research introduces a workflow-level approach built on two ideas:

- **The Entity, Action, Attribution model.** Every record is a small graph of *entities* (people, AI models, organisations), the *actions* they took (create, edit, remix, verify) and the *attributions* that link contributions to outputs.
- **An extensible metadata structure.** Typed extensions capture what matters for governance: AI involvement, rights, licences and authorisation conditions.

The design combines legal analysis across the EU, US and WIPO frameworks with the technical work of recording provenance as content is made, rather than reconstructing it afterwards.

## Why it matters

Transparency is a precondition for fairness. When the chain of creation is recorded, credit can follow contribution, rights can be respected, and people can decide how far to trust what they see.

ProvenanceKit is open source. You can read more at [provenancekit.com](https://www.provenancekit.com) and start building with the [documentation](https://docs.provenancekit.com).`,
  },
  {
    slug: "ai-skills-for-everyday-work-nairobi",
    title: "AI skills for everyday work: notes from a workshop in Nairobi",
    excerpt:
      "A hands-on day at Moringa School on using AI in ways that are practical, accessible and responsible, from sharper thinking to knowing when not to use AI at all.",
    topic: "ai-literacy",
    authorName: "Baranaba Mugabane",
    coverImage: null,
    coverAlt: "",
    status: "published",
    featured: true,
    featuredRank: 3,
    body: `After a couple of years in Europe completing my master's in AI for Sustainable Societies, it feels good to be back in Nairobi and putting some of that work into practice closer to home.

I was recently at Moringa School facilitating a hands-on workshop on **AI Skills for Everyday Work**, designed to help people use AI in ways that are practical, accessible and responsible.

## What we covered

Together with Jessica Francisca Colaço, we explored how professionals can use AI to:

- Support everyday work
- Sharpen their thinking
- Improve productivity
- Build more effective workflows

We did this regardless of technical background. Nobody needed to write code.

We also spent time on the risks, limitations and responsibilities that come with using AI: privacy and sensitive information, verification, human oversight, and knowing when AI should or should not be used.

## Literacy is about fit, not just prompts

The interesting shift is from AI literacy as *knowing how to use AI* to AI literacy as *knowing how AI should fit into the work*. Privacy, verification, human oversight and knowing when not to use AI matter as much as prompting skills. That distinction will matter even more as organisations move from individual experimentation to AI embedded in everyday workflows.

What I enjoyed most was seeing people become more intentional about how AI fits into the way they actually work.

## More to come

There are more workshops like this coming, for teams and organisations as well as schools. If you would like one for your team, [get in touch](mailto:hello@arttribute.io?subject=AI%20literacy%20workshop), or explore the courses on [CommonLab](https://commonlab.agentcommons.io).

Thank you to Moringa School for having us, and to everyone who joined us for the day.`,
  },
];
