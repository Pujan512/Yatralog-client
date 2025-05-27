'use client'
import { useEffect } from "react";
import { useAuthStore } from "./lib/store/useAuthStore";
import Link from "next/link";

export default function Home() {

  const { authUser } = useAuthStore();

  return (
    <section className="mx-20 my-8 grid grid-cols-2 gap-10 text-lg">
      <article className="flex flex-col gap-8 border-r-1">
        <h1 className="text-6xl font-bold">Yatralog - Your Travel Diary, Shared with the World</h1>
        {/* <p>
          Welcome to Yatralog, a dynamic travel journal platform where wanderers document their adventures, share insights, and inspire fellow explorers. Whether you're planning your next trip or reminiscing about past journeys, Yatralog helps you capture memories through photos, stories, and firsthand experiences.
        </p> */}
        <p><em>Yatralog is more than just a blog—it&apos;s a crowdsourced travel guide crafted by real travelers, for real travelers.</em></p>
      </article>
      <article className="flex flex-col gap-8">
        <h2 className="text-3xl font-semibold">Why Yatralog?</h2>
        <ul className="list-disc list-outside pl-5">
          <li><strong>Personal Travel Diary</strong> - Seamlessly log your trips with rich text, images, and location tags.</li>
          <li><strong>Discover & Learn</strong> - Gain authentic travel tips from other users&apos; blogs before you visit a new destination.</li>
          <li><strong>Share & Inspire</strong> - Publish your travelogues to help others explore the world through your eyes.</li>
          <li><strong>Community-Driven</strong> - Engage with fellow travelers, exchange recommendations, and build a network of globetrotters.</li>
        </ul>
        <p className="font-semibold">Start documenting your journey today!</p>
        {!authUser ? <Link className="outline-1 px-4 py-2 size-fit" href='/signup'>Sign Up Now!</Link> :
          <Link className="outline-1 px-4 py-2 size-fit" href='/blogs'>Explore Now!</Link>}
      </article>
    </section>
  );
}
