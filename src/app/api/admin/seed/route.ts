import { createServiceClient } from '@/lib/supabase/service';
import { NextResponse } from 'next/server';
import { rooms as staticRooms } from '@/config/data';
import { spaTreatments as staticSpa } from '@/config/data';
import { experiences as staticExp } from '@/config/data';
import { testimonials as staticTestimonials } from '@/config/data';
import { restaurantMenu as staticMenu } from '@/config/data';

export async function POST() {
  const supabase = createServiceClient();
  const results: string[] = [];

  // Seed rooms
  for (const room of staticRooms) {
    const { error } = await supabase.from('rooms').upsert({
      id: room.id,
      name: room.name,
      name_fr: room.nameFr,
      name_pt: room.namePt,
      description: room.description,
      description_fr: room.descriptionFr,
      description_pt: room.descriptionPt,
      price: room.price,
      currency: room.currency,
      size: room.size,
      max_guests: room.maxGuests,
      bed_type: room.bedType,
      amenities: room.amenities,
      images: room.images,
      featured: room.featured,
      slug: room.slug,
    }, { onConflict: 'id' });
    if (!error) results.push(`Room: ${room.name}`);
  }

  // Seed menu categories + items
  for (const cat of staticMenu) {
    const { error: catError } = await supabase.from('menu_categories').upsert({
      id: cat.id,
      name: cat.name,
      name_fr: cat.nameFr,
      name_pt: cat.namePt,
    }, { onConflict: 'id' });
    if (!catError) results.push(`Menu category: ${cat.name}`);

    for (const item of cat.items) {
      const { error } = await supabase.from('menu_items').upsert({
        id: item.id,
        category_id: cat.id,
        name: item.name,
        name_fr: item.nameFr,
        name_pt: item.namePt,
        description: item.description,
        description_fr: item.descriptionFr,
        description_pt: item.descriptionPt,
        price: item.price,
        dietary: item.dietary,
        image: item.image,
      }, { onConflict: 'id' });
      if (!error) results.push(`Menu item: ${item.name}`);
    }
  }

  // Seed spa treatments
  for (const treatment of staticSpa) {
    const { error } = await supabase.from('spa_treatments').upsert({
      id: treatment.id,
      name: treatment.name,
      name_fr: treatment.nameFr,
      name_pt: treatment.namePt,
      description: treatment.description,
      description_fr: treatment.descriptionFr,
      description_pt: treatment.descriptionPt,
      duration: treatment.duration,
      price: treatment.price,
      category: treatment.category,
      image: treatment.image,
    }, { onConflict: 'id' });
    if (!error) results.push(`Spa: ${treatment.name}`);
  }

  // Seed experiences
  for (const exp of staticExp) {
    const { error } = await supabase.from('experiences').upsert({
      id: exp.id,
      name: exp.name,
      name_fr: exp.nameFr,
      name_pt: exp.namePt,
      description: exp.description,
      description_fr: exp.descriptionFr,
      description_pt: exp.descriptionPt,
      price: exp.price,
      duration: exp.duration,
      image: exp.image,
    }, { onConflict: 'id' });
    if (!error) results.push(`Experience: ${exp.name}`);
  }

  // Seed testimonials
  for (const test of staticTestimonials) {
    const { error } = await supabase.from('testimonials').upsert({
      id: test.id,
      name: test.name,
      country: test.country,
      rating: test.rating,
      text: test.text,
      text_fr: test.textFr,
      text_pt: test.textPt,
      date: test.date,
      avatar: test.avatar,
    }, { onConflict: 'id' });
    if (!error) results.push(`Testimonial: ${test.name}`);
  }

  return NextResponse.json({
    message: `Seeded ${results.length} items successfully`,
    items: results,
  });
}
