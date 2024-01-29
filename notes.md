Revalidatepath and redirect only work in server actions
server actions can only (??) be called from few things, e.g. form action
for now, firebase login cannot be in a server component/action (no support for NodeJS) - can fix this by implementing manual NodeJS handling

does not seem like we can revalidate the cache of a path from a client component?
