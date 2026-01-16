import { Users, Star, Trophy, Heart, Sparkles, BookOpen, Music } from 'lucide-react';

export const elementaryClubs = {
    title: 'Grade School Organizations',
    description: 'Nurturing young talents and building character through active participation.',
    groups: [
        {
            name: 'Academic & Special Interest',
            icon: Star,
            items: [
                'Arts Club',
                'Book Lovers Club',
                'English–Filipino Club',
                'Mathematics–Science Club',
                'E-Pen Club',
                'I Can Read Club',
                'I Can Count Club',
            ],
        },
        {
            name: 'Religious Organizations',
            icon: Heart,
            items: [
                'Knights of the Altar',
                'Children of Mary',
                'Young Movers Club',
            ],
        },
        {
            name: 'Service & Leadership',
            icon: Users,
            items: [
                'Kids’ Crew Club',
                'Boy Scouts of the Philippines',
            ],
        },
        {
            name: 'Performing Arts & Sports',
            icon: Music,
            items: [
                'Drum and Lyre Corps',
                'Sports Club',
            ],
        },
    ],
};

export const highSchoolClubs = {
    title: 'High School Organizations',
    description: 'Developing leadership skills and fostering camaraderie among students.',
    groups: [
        {
            name: 'Academic Clubs',
            icon: BookOpen,
            items: [
                'Filipiniana Club',
                'Writers’ Guild',
                'Math-Science Club',
                'Homemakers Club',
                'Book Lovers Club',
            ],
        },
        {
            name: 'Religious Clubs',
            icon: Sparkles,
            items: [
                'Catholic Women’s League (CWL)',
                'HSABAI Chorale',
                'Knights / Handmaids of the Altar',
                'Junior-Lay Ministers',
            ],
        },
        {
            name: 'Special Clubs',
            icon: Trophy,
            items: [
                'E-Club',
                'Drum and Lyre Corps (DLC)',
                'Sports Club',
                'Performing Arts',
                'Peer Counseling',
            ],
        },
    ],
};
