'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { restaurantMenu } from '@/config/data';
import { useLocale } from '@/context/LocaleContext';

export function RestaurantSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [activeCategory, setActiveCategory] = useState('starters');
  const { t, locale } = useLocale();

  const activeItems = restaurantMenu.find(cat => cat.id === activeCategory)?.items || [];

  const getCatName = (cat: typeof restaurantMenu[0]) => locale === 'fr' && cat.nameFr ? cat.nameFr : locale === 'pt' && cat.namePt ? cat.namePt : cat.name;
  const getItemName = (item: typeof activeItems[0]) => locale === 'fr' && item.nameFr ? item.nameFr : locale === 'pt' && item.namePt ? item.namePt : item.name;
  const getItemDesc = (item: typeof activeItems[0]) => locale === 'fr' && item.descriptionFr ? item.descriptionFr : locale === 'pt' && item.descriptionPt ? item.descriptionPt : item.description;

  return (
    <section id="restaurant" ref={sectionRef} className="relative py-24 md:py-32 bg-luxury-dark overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-luxury-charcoal via-luxury-gray to-luxury-dark opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-dark via-luxury-dark/95 to-luxury-dark" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-gold-500/10 text-gold-500 text-xs tracking-[0.2em] uppercase border border-gold-500/20">
            {t('restaurant.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-cream mb-4">
            {t('restaurant.title')}
          </h2>
          <p className="text-cream/60 max-w-2xl mx-auto">{t('restaurant.subtitle')}</p>
        </div>

        {/* Chef Feature */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-20"
        >
          <div className="relative aspect-[4/3] lg:aspect-[3/4] rounded-2xl overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: 'url(/images/restaurant/dining-1.jpg)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="text-gold-500 text-sm tracking-wider uppercase mb-2">{t('restaurant.executiveChef')}</div>
              <h3 className="text-2xl md:text-3xl font-display text-cream mb-2">{t('restaurant.chefName')}</h3>
              <p className="text-cream/70 text-sm">{t('restaurant.chefDesc')}</p>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="text-2xl md:text-3xl font-display text-cream mb-6">
              {t('restaurant.threeDining')}
            </h3>
            <div className="space-y-6">
              {[
                {
                  name: t('restaurant.leJardin'),
                  desc: t('restaurant.leJardinDesc'),
                  time: t('restaurant.leJardinTime'),
                },
                {
                  name: t('restaurant.terrace'),
                  desc: t('restaurant.terraceDesc'),
                  time: t('restaurant.terraceTime'),
                },
                {
                  name: t('restaurant.privateDining'),
                  desc: t('restaurant.privateDiningDesc'),
                  time: t('restaurant.privateDiningTime'),
                },
              ].map((venue, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  className="p-4 md:p-6 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:border-gold-500/20 transition-all duration-500"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-display text-cream">{venue.name}</h4>
                    <span className="text-xs text-gold-500/70">{venue.time}</span>
                  </div>
                  <p className="text-sm text-cream/60">{venue.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Menu Section */}
        <div>
          <h3 className="text-2xl md:text-3xl font-display text-cream text-center mb-8">
            {t('restaurant.menu')}
          </h3>

          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10">
            {restaurantMenu.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm transition-all duration-500 ${
                  activeCategory === category.id
                    ? 'bg-gold-500 text-black'
                    : 'bg-white/5 text-cream/70 hover:bg-white/10 border border-white/10'
                }`}
              >
                {getCatName(category)}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {activeItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <GlassCard className="h-full group cursor-pointer overflow-hidden" hover padding="none">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-lg font-display text-cream group-hover:text-gold-500 transition-colors">
                            {getItemName(item)}
                          </h4>
                          <span className="text-lg font-display text-gold-500 ml-4">
                            ${item.price}
                          </span>
                        </div>
                        <p className="text-sm text-cream/60 mb-3">
                          {getItemDesc(item)}
                        </p>
                        {item.dietary.length > 0 && (
                          <div className="flex gap-2">
                            {item.dietary.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 text-[10px] rounded-full bg-gold-500/10 text-gold-500 border border-gold-500/20"
                              >
                                {tag === 'VG' ? t('restaurant.vegetarian') : tag === 'GF' ? t('restaurant.glutenFree') : tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="text-center mt-12">
            <Button size="lg">
              {t('restaurant.reservations')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
