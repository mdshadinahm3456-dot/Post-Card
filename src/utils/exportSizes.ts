import { ExportRatioKey, ExportSizeConfig } from '../types';

export const EXPORT_SIZE_CONFIGS: Record<ExportRatioKey, ExportSizeConfig> = {
  postcard: {
    key: 'postcard',
    name: 'Postcard (পোস্টকার্ড)',
    ratioLabel: '4:3',
    aspectRatioClass: 'aspect-[4/3]',
    width: 1200,
    height: 900,
    description: 'ক্লাসিক পোস্টকার্ড অনুপাত (4:3)'
  },
  square: {
    key: 'square',
    name: 'Instagram Square (স্কয়ার)',
    ratioLabel: '1:1',
    aspectRatioClass: 'aspect-[1/1]',
    width: 1080,
    height: 1080,
    description: 'ইনস্টাগ্রাম ও সোশ্যাল পোস্ট (1:1)'
  },
  story: {
    key: 'story',
    name: 'Instagram Story (স্টোরি)',
    ratioLabel: '9:16',
    aspectRatioClass: 'aspect-[9/16]',
    width: 1080,
    height: 1920,
    description: 'ইনস্টাগ্রাম রিল/স্টোরি (9:16)'
  },
  facebook: {
    key: 'facebook',
    name: 'Facebook Post (ফেসবুক পোস্ট)',
    ratioLabel: '1.91:1',
    aspectRatioClass: 'aspect-[1.91/1]',
    width: 1200,
    height: 630,
    description: 'ল্যান্ডস্কেপ শেয়ারিং ব্যানার (1.91:1)'
  },
  whatsapp: {
    key: 'whatsapp',
    name: 'WhatsApp Status (স্ট্যাটাস)',
    ratioLabel: '9:16',
    aspectRatioClass: 'aspect-[9/16]',
    width: 1080,
    height: 1920,
    description: 'হোয়াটসঅ্যাপ স্ট্যাটাস (9:16)'
  }
};
