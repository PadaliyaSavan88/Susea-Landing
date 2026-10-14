# HSN data cleanup: entries removed from public/data/hsn-2022.json

The HSN code checker's data came from the Claude Design export (`hsn-data.js`, India GST HSN master). It was
checked against the official WCO HS 2022 nomenclature
(https://github.com/datasets/harmonized-system, 6,940 rows). For chapters 01 to 97, any 4-digit heading or
6-digit subheading that is not in HS 2022 was removed, along with everything under it. Many removed codes are
real pre-2022 codes that HS 2022 deleted or renumbered (e.g. 0101.10, 1201.00, 9703.00); others are parsing
errors or test rows (e.g. "1111 AKASH test", the 2031/2032/3011-style mis-parsed codes). Chapter 98 (India
only, headings 9801 to 9807) was kept as is.

## Removed headings (131)

Code | Description | Subheadings | Items
---|---|---|---
0503 | Horsehair and horsehair waste, whether or not put up as a layer with or without supporting material | 1 | 1
0509 | Natural sponges of animal origin - natural sponges of animal origin : - of wild life | 1 | 2
0636 | Scampi (Macrobachium spp.) | 1 | 0
1009 | other | 1 | 1
1111 | AKASH test | 0 | 0
1402 | Vegetable materials of a kind used primarily as stuffing or as padding (for example, kapok, vegetable hair and eel?grass), whether or not put up as a layer with or without supporting material | 1 | 1
1403 | Vegetable material of a kind used primarily in brooms or in brushes (for example, broom-corn, piassava, couch-grass and istle), whether or not in hanks or bundles | 1 | 2
1519 | - | 0 | 0
2031 | Fresh or chilled | 0 | 0
2032 | Frozen | 0 | 0
2042 | Other meat of sheep,fresh or chilled | 0 | 0
2044 | Other meat of sheep, frozen | 0 | 0
2062 | Of bovine animals, frozen | 0 | 0
2064 | Of swine,frozen | 0 | 0
2071 | Of fowls of the species Gallus domesticus | 0 | 0
2072 | Of turkeys | 0 | 0
2073 | Of ducks, geese or guinea fowls | 0 | 0
2075 | Of geese | 0 | 0
2109 | Other, including edible flours and meals of meat or meat offal | 0 | 0
2838 | Fulminates, cyanates and thiocyanates - fulminates, cyanates and thiocyanates : fulminates | 1 | 3
2848 | Phosphides, whether or not chemically defined, excluding ferrophosphorus | 1 | 3
2851 | Other inorganic compounds (including distilled or conductivity water and water of similar purity); liquid air (whether or not rare gases have been removed); compressed air; amalgams, other than amalgams of precious metals - other inorganic compounds (including distilled or conductivity water and water of similar purity); liquid air (whether or not rare gases have been removed); compressed air; amalgams, other than amalgams of precious metals : distilled or conductivity water and water of similar purity | 1 | 7
3011 | Ornamental fish | 0 | 0
3019 | Other Live Fish | 0 | 0
3021 | Salmonidae, excluding livers and roes | 0 | 0
3022 | Flat fish (Pleutronectidae, Bothidae, Cynoglossidae, Soleidae, Scophthalmidae and Citharidae), excluding livers and roes | 0 | 0
3023 | Tunas (of the genus Thunnus), skipjack or stripe-bellied bonito [Euthynnus (Katsuwonus pelamis), excluding livers and roes | 0 | 0
3024 | Herrings (Clupea harengus, Clupea pallasii), anchovies (Engraulis spp), sardines (Sardina pilchardus, Sardinops spp), sardinella (Sardinella spp.), brisling or sprats (Sprattus sprattus), mackerel (Scomber scombrus, Scomber australascicus, scomber japonicus), jack and horse mackerel (trachurus spp.) cobia (Rachycentron canadum) and swordfish (Xiphias gladius), excluding livers and roes | 0 | 0
3025 | Fish of the families Bregmacerotidae, Euclichthyidae, Gadidae, Macrouridae, Melanonidae, Merluccidae, Moridae and Muraenolepididae, excluding livers and roes | 0 | 0
3026 | Other fish, excluding livers and roes | 0 | 0
3027 | Tilapias (Oreochromis spp.), catfish (Pangasius spp. Silurus spp., Clarias spp., Ictalurus spp.) carp (Cyprinus carpio, Carassius carassius, Ctenopharyngodon idellus, Hypophthalmichthys spp. Cirrhinus spp. Mylopharyngodon piceus), eels (Anguila spp.), Nile perch (Lates niloticus) and snakeheads (Channa spp.) excluding livers and roes | 0 | 0
3028 | Other fish exculding edible fish offal of sub-headings 0302 91 to 0302 99 | 0 | 0
3029 | Livers, roes, milt, fish fins, heads, tails, maws and other edible fish offal | 0 | 0
3031 | Pacific salmon (Oncorhynchus nerka, Oncorhynchus gorbuscha, Oncorhynchus keta, Oncorhynchus tschawytscha. Oncorhynchus kisutch, Oncorhynchus masou and Oncorhynchus rhodurus, excluding livers and roes | 0 | 0
3032 | Other salmonidae, excluding livers and roes | 0 | 0
3033 | Flat fish (Pleutronectidae, Bothidae, Cynoglossidae, Soleidae, Scophthalmidae and Citharidae), excluding livers and roes | 0 | 0
3034 | Tunas (of the genus Thunnus), skipjack or stripe-bellied bonito [Euthynnus (Katsuwonus) pelamis], excluding livers and roes | 0 | 0
3035 | Herrings (Clupea harengus, Culpea pallasii) and Cod (Gadus morhua, Gadus ogac, Gadus macrocephalus), excluding livers and roes | 0 | 0
3036 | Fish of the families Bregmacerotidae, Euclichthyidae, Gadidae, Macrouridae, Melanonidae, Merlucciidae, Moridae and Muraenolepididae, excluding edible fish offal of sub-headings 0303 91 to 0303 99 | 0 | 0
3037 | Other fish, excluding livers and roes | 1 | 0
3038 | Other fish, excluding edible fish offal of sub-headings 0303 91 to 0303 99 | 0 | 0
3039 | Livers, roes, milt, fish fins, heads, tails, maws and other edible fish offal | 0 | 0
3041 | Fresh or chilled | 0 | 0
3042 | Frozen fillets | 0 | 0
3045 | Other, fresh or chilled | 0 | 0
3046 | Frozen fillets of tilapias (Oreochromis spp.), catfish (Pangasius spp., Silurus spp., Clarias spp., Ictalurus spp.), carp (Cyprinus spp., Carassius spp., Ctenopharyngodon idellus, Hypophthalmichthys spp., Cirrhinus spp., Mylopharyngodon piceus, Catla catla, Labeo spp., Osteochilus hasselti, Leptobarbus hoeveni, Megalobrama spp.), eels (Anguilla spp.), Nile perch (Lates niloticus) and snakeheads (Channa spp.) | 0 | 0
3047 | Frozen fillets of fish of Bregmacerotidae, Euclichthyidae, Gadidae, Macrouridae, Melanonidae, Merlucciidae, Moridae and Muraenolepididae | 0 | 0
3048 | Frozen fillets of other fish | 0 | 0
3049 | Other | 0 | 0
3054 | Smoked fish, including fillets | 0 | 0
3055 | Dried fish, whether or not suited but not smoked | 0 | 0
3056 | Fish, salted but not dried or smoked and fish in brine | 0 | 0
3061 | Frozen | 1 | 0
3062 | Not frozen | 0 | 0
3069 | Other | 0 | 0
3072 | Scallops, including queen scallops, of the genera Pecten, Chlamys or Placopecten | 0 | 0
3073 | Mussels (Mytilus spp., Perna spp.) | 0 | 0
3074 | Cuttle fish and squid | 0 | 0
3075 | Octopus (Octopus spp.) | 0 | 0
3078 | Abalone (Haliotis Spp.) and stromboid conchs (Strombus spp.) | 0 | 0
3079 | Other, including flours, meals and pellets, of aquatic invertebrates other than crustaceans, fit for human consumption | 0 | 0
3082 | Sea urchins (Strongylocentrotus spp., Paracentrotus lividus, Loxechinus albus, Echinus esculentus) | 0 | 0
4022 | In powder, granules or other solid forms, of a fat content, by weight not exceeding 1.5% | 0 | 0
4081 | Egg yolks | 0 | 0
4089 | Other | 0 | 0
4204 | Articles of leather or of composition leather, of a kind used in machinery or mechanical appliances or for other technical uses - articles of leather or of composition leather, of a kind used in machinery or mechanical appliances or for other technical uses : pickers for cotton machinery | 1 | 8
4422 | For jute machinery | 1 | 1
4423 | For silk regenerated and synthetic fibre machinery | 1 | 1
4424 | For other machinery | 1 | 1
4815 | Omitted | 1 | 1
5040 | Guts other than for natural food castings | 2 | 0
5059 | Other feather (excluding for stuffing purpose) | 3 | 0
5061 | Bones, including horn-cores, crushed | 4 | 0
5069 | Bone meal | 2 | 0
5100 | Other | 0 | 0
5119 | Silkworm pupae | 3 | 0
5280 | Saari | 1 | 1
5304 | Sisal and other textile fibres of the genus agave, raw or processed but not spun; tow and waste of these fibres (including yarn waste and garnetted stock) sisal and other textile fibres of the genus agave, raw : sisal fibre | 2 | 4
6012 | Chicory plants and roots | 1 | 0
6031 | Fresh | 0 | 0
6049 | Other | 0 | 0
6503 | Omitted | 1 | 1
6705 | Human hair, dressed, thinned, bleached or otherwise worked; wool or other animal hair or other textile materials, prepared for use in making wigs or the like | 0 | 0
6706 | Wigs, false beards, eyebrows and eyelashes, switches and the like, of human or animal hair or of textile materials; articles of human h air not elsew here specif ied o r included | 0 | 0
6707 | Human hair, dressed, thinned, bleached or otherwise worked; wool or other animal hair or other textile materials, prepared for use in making wigs or the like | 0 | 0
6708 | Wigs, false beards, eyebrows and eyelashes, switches and the like, of human or animal hair or of textile materials; articles of human h air not elsew here specif ied o r included | 0 | 0
6709 | Human hair, dressed, thinned, bleached or otherwise worked; wool or other animal hair or other textile materials, prepared for use in making wigs or the like | 0 | 0
6710 | Wigs, false beards, eyebrows and eyelashes, switches and the like, of human or animal hair or of textile materials; articles of human h air not elsew here specif ied o r included | 0 | 0
6711 | Human hair, dressed, thinned, bleached or otherwise worked; wool or other animal hair or other textile materials, prepared for use in making wigs or the like | 0 | 0
6712 | Wigs, false beards, eyebrows and eyelashes, switches and the like, of human or animal hair or of textile materials; articles of human h air not elsew here specif ied o r included | 0 | 0
6713 | Human hair, dressed, thinned, bleached or otherwise worked; wool or other animal hair or other textile materials, prepared for use in making wigs or the like | 0 | 0
6908 | Glazed ceramic flags and paving, hearth or wall tiles; glazed ceramic mosaic cubes and the like, whether or not on a backing | 2 | 6
7012 | Omitted | 1 | 1
7051 | Lettuce | 0 | 0
7052 | Chicory | 0 | 0
7095 | Mushrooms and truffles | 0 | 0
7123 | Mushrooms, wood ears (Auricularia spp.), jelly fungi (Tremella spp.) and truffles | 0 | 0
7133 | Beans (Vigna spp., Phaseolus spp.) | 0 | 0
7139 | Heading 7139 | 1 | 0
7414 | Cloth (including endless bands), grill and netting, of copper wire; expanded metal of copper - cloth : endless bands, for machinery | 2 | 5
7416 | Copper springs | 1 | 1
7417 | Cooking or heating apparatus of a kind used for domestic purposes, non-electric, and parts thereof, of copper - cooking or heating apparatus of a kind used for domestic purposes, non-electric, and parts thereof, of copper : stove : oil pressure stove | 1 | 6
7512 | Other | 1 | 1
7803 | Lead bars, rods, profiles and wire - lead bars, rods, profiles and wire: bars and rods: hollow bars | 1 | 5
7805 | Lead tubes, pipes and tube or pipe fittings (for example, coupling, elbows, sleeves) - lead tubes, pipes and tube or pipe fittings (for example, coupling, elbows, sleeves): tubes and pipes | 1 | 2
7906 | Zinc tubes, pipes and tube or pipe fittings (for example, couplings, elbows, sleeves)- zinc tubes, pipes and tube or pipe fittings (for example, couplings, elbows, sleeves) :tubes and pipes | 1 | 2
8004 | Tin plates, sheets and strip, of a thickness exceeding 0.2 mm - tin plates, sheets and strip, of a thickness exceeding 0.2 mm : electrolytic plates and sheets | 1 | 2
8005 | Omitted | 1 | 1
8006 | Tin tubes, pipes and tube or pipe fittings (for example, couplings, elbows, sleeves)- tin tubes, pipes and tube or pipe fittings (for example, couplings, elbows, sleeves) : tubes and pipes | 1 | 2
8011 | Coconuts | 0 | 0
8012 | Brazil nuts | 0 | 0
8013 | Cashew nuts | 0 | 0
8021 | Almonds | 0 | 0
8022 | Hazelnuts or fiberts (Corylus spp.) | 0 | 0
8023 | Walnuts | 0 | 0
8029 | Betel nuts | 1 | 0
8071 | Melons (including watermelons) | 0 | 0
8107 | Cadmium and articles thereof, including waste and scrap | 3 | 4
8352 | Electrical capacitors, fixed, variable or adjustable (pre-set) | 0 | 0
8469 | Typewriters other than printers of heading 8443; word-processing machines | 5 | 11
8520 | Magnetic tape recorders and other sound recording apparatus, whether or not incorporating a sound reproducing device dictating machines not capable of operating without an external source of power | 6 | 9
8803 | Parts of goods of heading 8801 or 8802 | 4 | 4
9009 | Photocopying apparatus incorporating an optical system or of the contact type and thermo-copying apparatus - electrostatic photocopying apparatus: operating by reproducing the original image directly onto the copy (direct process) | 9 | 9
9070 | Cloves (whole fruit, cloves and stems) | 0 | 0
9091 | Seeds of anise | 2 | 0
9093 | Cumin, black | 2 | 0
9095 | Fennel seeds | 2 | 0
9203 | Keyboard pipe organs; harmoniums and similar keyboard instruments with free metal reeds 9203 00? keyboard pipe organs; harmoniums and similar keyboard instruments with free metal reeds keyboard pipe organs; harmoniums and similar keyboard instruments with free metal reeds: harmoniums and similar key board instruments with free metal reeds | 1 | 2
9204 | Percussion musical instruments (for example, drums, xylophones, cymbols, castanets, maracas) | 3 | 3
9501 | Wheeled toys designed to be ridden by children (for example, tricycles, scooters, pedal cars); dollr carriages - wheeled toys designed to be ridden by children (for example, tricycles, scooters, pedal cars); dollr carriages: wheel toys designed to be ridden by children; dolls carriages | 1 | 2
9502 | Dolls representing only human beings - dolls, whether or not dressed: of wood | 3 | 6

## Removed subheadings under real headings (699)

Heading | Subheading | Description | Items
---|---|---|---
0101 | 0101.10 | Live horses, asses, mules and hinnies pure-bred breeding animals horses | 3
0102 | 0102.10 | Live bovine animals - bulls - pure-bred breeding animals : adult | 4
0105 | 0105.19 | Species gallu sdomesticus, ducks, geese, turkeys and guinea fowls weighing not more than 185g : other | 1
0105 | 0105.92 | Live poultry, that is to say, fowls of the species gallus domesticus, ducks, geese, turkeys and guineafowls - other - fowls of the species gallus domesticus weighing not more than 2000g | 1
0105 | 0105.93 | Live poultry, that is to say, fowls of the species gallus domesticus, ducks, geese, turkeys and guineafowls - other - fowls of the species gallusdomesticus weighing more than 2000g, | 1
0203 | 0203.10 | Fresh or chilled | 0
0204 | 0204.20 | Other meat of sheep, fresh or chilled | 0
0208 | 0208.20 | Other meat and edible meat offal, fresh, chilled or frozen frogr legs | 1
0209 | 0209.00 | Pig fat, free of lean meat and poultry fat, not rendered or otherwise extracted, fresh, chilled, frozen, salted, in brine, dried or smoked | 0
0302 | 0302.40 | Fish, fresh or chilled, excluding fishfillets and other fish meat of heading 0304herrings (clupea harengus, clupea pallasii) excluding livers and roes | 1
0302 | 0302.50 | Fish, fresh or chilled, excluding fishfillets and other fish meat of heading 0304cod (gadus morhua, gadus ogac, gadus macrocephalus), excluding livers and roes | 1
0302 | 0302.61 | Fish, fresh or chilled, excluding fishfillets and other fish meat of heading 0304 other fish, excluding livers and roes : sardines (sardina pilchardus, sardinops spp.), sardinella (sardinella spp.) brisling or sprats(sprattus sprattus) | 1
0302 | 0302.62 | Fish, fresh or chilled, excluding fishfillets and other fish meat of heading 0304 other fish, excluding livers and roes haddock (melanogrammus aeglefinus) | 1
0302 | 0302.63 | Fish, fresh or chilled, excluding fishfillets and other fish meat of heading 0304 other fish, excluding livers and roes coalfish (pollachius virens) | 1
0302 | 0302.64 | Fish, fresh or chilled, excluding fishfillets and other fish meat of heading 0304 other fish, excluding livers and roes mackerel (scomber scombrus, scomber australasicus, scomber japonicus) | 1
0302 | 0302.65 | Fish, fresh or chilled, excluding fishfillets and other fish meat of heading 0304 other fish, excluding livers and roes dogfish and other sharks | 1
0302 | 0302.66 | Fish, fresh or chilled, excluding fish fillets and other fish meat of heading 0304- other fish, excluding livers and roes:-- eels (anguilla spp.) | 1
0302 | 0302.67 | Fish, fresh or chilled, excluding fish fillets and other fish meat of heading 0304- other fish, excluding livers and roes:-- swordfish (xiphias gladius) | 1
0302 | 0302.68 | Fish, fresh or chilled, excluding fish fillets and other fish meat of heading 0304- other fish, excluding livers and roes:-- toothfish (dissostichus spp.) | 1
0302 | 0302.69 | Fish, fresh or chilled, excluding fishfillets and other fish meat of heading 0304 other fish, excluding livers and roes other : hilsa | 4
0302 | 0302.70 | Fish, fresh or chilled, excluding fishfillets and other fish meat of heading 0304livers and roes | 1
0302 | 0302.90 | Livers and roes | 1
0303 | 0303.21 | Fish, frozen, excluding fish fillets andother fish meat of heading 0304 other salmonidae, excluding livers and roes trout (salmo trutta, oncorhynchus mykiss, oncorhynchus clarki,oncorhynchus aguabonita,oncorhynchus gilae, oncorhynchus apache andoncorhynchus chrysogaster) | 1
0303 | 0303.22 | Fish, frozen, excluding fish fillets andother fish meat of heading 0304 other salmonidae, excluding livers and roes atlantic salmon (salmo salar) and danube salmon (hucho hucho) | 1
0303 | 0303.50 | Fish, frozen, excluding fish fillets andother fish meat of heading 0304herrings (clupea harengus, clupea pallasii), excluding livers and roes | 1
0303 | 0303.52 | Fish, frozen, excluding fish fillets andother fish meat of heading 0304 -herrings (clupea harengus, clupea pallasii) and cod (gadus morhua, gadus ogac, gadus macrocephalus) excluding livers and roes: -- cod (gadus morhua, gadus ogac, gadus macrocephalus) | 1
0303 | 0303.60 | Fish, frozen, excluding fish fillets andother fish meat of heading 0304 cod (gadus morhua, gadus ogac, gadus macrocephalus), excluding livers and roes | 1
0303 | 0303.61 | Fish, frozen, excluding fish fillets andother fish meat of heading 0304 - swordfish(xiphia gladius) and toothfish (dissostichus spp.) excluding livers and roes: -- swordfish(xiphia gladius) | 1
0303 | 0303.62 | Fish, frozen, excluding fish fillets andother fish meat of heading 0304 - swordfish(xiphia gladius) and toothfish (dissostichus spp.) excluding livers and roes: -- toothfish (dissostichus spp.) | 1
0303 | 0303.71 | Fish, frozen, excluding fish fillets andother fish meat of heading 0304 other fish, excluding livers and roes : sardines (sardina pilchardus, sardinops spp.), sardinella (sardinella spp.), brisling or sprats(sprattus sprattus) | 1
0303 | 0303.72 | Fish, frozen, excluding fish fillets andother fish meat of heading 0304 other fish, excluding livers and roes : haddock (melanogrammus aeglefinus) | 1
0303 | 0303.73 | Fish, frozen, excluding fish fillets andother fish meat of heading 0304 other fish, excluding livers and roes : coalfish (pollachius virens) | 1
0303 | 0303.74 | Fish, frozen, excluding fish fillets andother fish meat of heading 0304 other fish, excluding livers and roes : mackerel (scomber scombrus, scomber australasicus, scomber japonicus) | 1
0303 | 0303.75 | Fish, frozen, excluding fish fillets andother fish meat of heading 0304 other fish, excluding livers and roes : dogfish and other sharks | 1
0303 | 0303.76 | Fish, frozen, excluding fish fillets andother fish meat of heading 0304 other fish, excluding livers and roes : eels (anguilla spp.) | 1
0303 | 0303.77 | Fish, frozen, excluding fish fillets andother fish meat of heading 0304 other fish, excluding livers and roes : sea bass (dicentrarchus labrax, dicentrarchus punctatus) | 1
0303 | 0303.78 | Fish, frozen, excluding fish fillets andother fish meat of heading 0304 other fish, excluding livers and roes : hake (merluccius spp., urophycis spp.) | 1
0303 | 0303.79 | Fish, frozen, excluding fish fillets andother fish meat of heading 0304 other : hilsa | 11
0303 | 0303.80 | Fish, frozen, excluding fish fillets andother fish meat of heading 0304livers and roes egg or egg yolk of fish including shrimps | 2
0303 | 0303.90 | Egg or egg yolk of fish | 2
0304 | 0304.10 | Fish fillets and other fish meat(whether or not minced), fresh,chilled or frozen fresh or chilled | 1
0304 | 0304.11 | Fish fillets and other fish meat(whether or not minced), fresh,chilled or frozen -fresh or chilled: -- swordfish (xiphia gladius) | 1
0304 | 0304.12 | Fish fillets and other fish meat(whether or not minced), fresh,chilled or frozen- fresh or chilled: -- toothfish (dissostichus spp.) | 1
0304 | 0304.19 | Fish fillets and other fish meat(whether or not minced), fresh,chilled or frozen - fresh or chilled: -- other | 1
0304 | 0304.20 | Fish fillets and other fish meat(whether or not minced), fresh,chilled or frozen frozen fillets hilsa | 6
0304 | 0304.21 | Fish fillets and other fish meat(whether or not minced), fresh,chilled or frozen- frozen fillets: swordfish (xiphias gladius) | 1
0304 | 0304.22 | Fish fillets and other fish meat(whether or not minced), fresh,chilled or frozen- frozen fillets: toothfish (dissostichus spp.) | 1
0304 | 0304.29 | Fish fillets and other fish meat(whether or not minced), fresh,chilled or frozen- frozen fillets:-- other: --- hilsa | 6
0304 | 0304.90 | Fish fillets and other fish meat(whether or not minced), fresh,chilled or frozen-other | 1
0305 | 0305.10 | Fish, dried, salted or in brine; smokedfish, whether or not cooked before orduring the smoking process; flours,meals and pellets, of fish fit for humanconsumptionflours, meals and pellets, of fish fit for human consumption | 1
0305 | 0305.30 | Fish fillets, dried, salted or in brine, but not smoked | 1
0306 | 0306.21 | Crustaceans, whether in shell or not,live, fresh, chilled, frozen, dried, saltedor in brine; crustaceans, in shell, cookedby steaming or by boiling in water,whether or not chilled, frozen, dried,salted or in brine; flours, meals andpellets, of crustaceans, fit for humanconsumptionnot frozen : rock lobster and other sea craw fish(palinurus spp., panulirus spp., jasus spp.) | 1
0306 | 0306.22 | Crustaceans, whether in shell or not,live, fresh, chilled, frozen, dried, saltedor in brine; crustaceans, in shell, cookedby steaming or by boiling in water,whether or not chilled, frozen, dried,salted or in brine; flours, meals andpellets, of crustaceans, fit for humanconsumptionnot frozen : lobsters (homarus spp.) | 1
0306 | 0306.24 | Crustaceans, whether in shell or not,live, fresh, chilled, frozen, dried, saltedor in brine; crustaceans, in shell, cookedby steaming or by boiling in water,whether or not chilled, frozen, dried,salted or in brine; flours, meals andpellets, of crustaceans, fit for humanconsumptionnot frozen : crabs | 1
0306 | 0306.25 | Norway lobsters(nephops norvegicus) | 1
0306 | 0306.26 | Cold-water shrimps and prawns (pandalus spp, crangon crangon) | 1
0306 | 0306.27 | Powdered | 2
0306 | 0306.29 | Crustaceans, whether in shell or not,live, fresh, chilled, frozen, dried, saltedor in brine; crustaceans, in shell, cookedby steaming or by boiling in water,whether or not chilled, frozen, dried,salted or in brine; flours, meals andpellets, of crustaceans, fit for humanconsumptionnot frozen : other, including flours, meals and pellets, of crustaceans, fit for human consumption | 1
0307 | 0307.41 | Molluscs, whether in shell or not, live,fresh, chilled, frozen, dried, salted or inbrine; aquatic invertebrates other than crustaceans and molluscs, live, fresh,chilled, frozen, dried, salted or in brine;flours, meals and pellets of aquaticinvertebrates other than crustaceans,fit for human consumptioncuttle fish (sepia officinalis, rossiamacrosoma, septiola spp.) and squid(ommastrephes spp., loligo spp., nototodarusspp., sepioteuthis spp.) : live, fresh and chilled cuttle fish | 2
0307 | 0307.89 | Molluscs; whether in shell or not, live, fresh, chilled, frozen, dried, salted or in brine; smoked molluscs, whether in shell or not, whether or not cooked before or during the smoking process | 1
0403 | 0403.10 | Buttermilk, curdled milk and cream, yogurt, kephir and other fermented or acidified milk and cream, whether or not concentrated or containing added sugar or other sweetening matter or flavoured or containing added fruit, nuts or cocoa yogurt | 1
0407 | 0407.00 | Birds eggs, in shell, fresh, preserved or cooked | 1
0410 | 0410.00 | Edible products of animal origin, not | 3
0603 | 0603.10 | Cut flowers and flower buds of a kind suitable for bouquets or for ornamental purposes, fresh, dried, dyed, bleached, impregnated or otherwise prepared fresh | 1
0604 | 0604.10 | Foliage, branches and other parts of plants, without flowers or flower buds, and grasses, mosses and lichens, being goods of a kind suitable for bouquets or for ornamental purposes, fresh, dried, dyed, bleached, impregnated or otherwise prepared mosses and lichens | 1
0604 | 0604.91 | Foliage, branches and other parts of plants, without flowers or flower buds, and grasses, mosses and lichens, being goods of a kind suitable for bouquets or for ornamental purposes, fresh, dried, dyed, bleached, impregnated or otherwise prepared other : fresh | 1
0604 | 0604.99 | Foliage, branches and other parts of plants, without flowers or flower buds, and grasses, mosses and lichens, being goods of a kind suitable for bouquets or for ornamental purposes, fresh, dried, dyed, bleached, impregnated or otherwise prepared other : other | 1
0709 | 0709.10 | Other vegetables, fresh or chilled globe artichokes | 1
0709 | 0709.90 | Other vegetables, fresh or chilled other : other | 1
0711 | 0711.30 | Vegetables provisionally preserved(for example, by sulphur dioxide gas,in brine, in sulphur water or in otherpreservative solutions), but unsuitablein that state for immediate consumption capers | 1
0802 | 0802.90 | Other nuts, fresh or dried, whether or not shelled or peeled - other | 1
0805 | 0805.20 | Citrus fruit, fresh or dried mandarins (including tangerines and satsumas); clementines, wilkings and similar citrus hybrids | 1
0808 | 0808.21 | Sour Cherries | 0
0808 | 0808.29 | Apples, pears and quinces; fresh | 0
0904 | 0904.20 | Fruits of the genus Capsicum or of the genus Pimenta, dried or crushed or ground | 0
0905 | 0905.00 | Vanilla | 0
0906 | 0906.10 | Cinnamon and cinnamon-tree flowers neither crushed nor ground : cassia | 4
0908 | 0908.10 | Nutmeg | 0
0908 | 0908.30 | Cardamoms | 0
0909 | 0909.10 | Seeds of anise or badian | 0
0909 | 0909.20 | Seeds of coriander | 0
0909 | 0909.30 | Seeds of cumin | 0
0909 | 0909.40 | Seeds of caraway | 0
0909 | 0909.50 | Seeds of fennel; juniper berries | 0
0910 | 0910.10 | Ginger | 0
0910 | 0910.40 | Ginger, saffron, turmeric (curcuma), thyme, bay leaves, curry and other spices thyme; bay `leaves : tejpat (leaves of cassia lignea) | 3
0910 | 0910.50 | Ginger, saffron, turmeric (curcuma), thyme, bay leaves, curry and other spices curry | 1
1001 | 1001.10 | Durum wheat | 2
1001 | 1001.90 | Wheat and meslin | 4
1002 | 1002.00 | Rye | 2
1003 | 1003.00 | Barley | 2
1004 | 1004.00 | Oats | 2
1007 | 1007.00 | Grain sorghum | 2
1008 | 1008.20 | Millet | 6
1102 | 1102.10 | Cereal flours other than that of wheat or meslin rye flour | 1
1102 | 1102.30 | Cereal flours other than that of wheat or meslin rice flour | 1
1201 | 1201.00 | Soya beans, whether or not broken | 2
1202 | 1202.10 | In shell | 4
1202 | 1202.20 | Shelled, whether or not broken | 2
1207 | 1207.20 | Cotton seeds | 2
1209 | 1209.26 | Seeds, fruit and spores, of a kind used for sowing seeds of forage plants : timothy grass seed | 1
1211 | 1211.10 | Plants and parts of plants (including seeds and fruits), of a kind used primarily in perfumery, in pharmacy or for insecticidal, fungicidal or similar purpose, fresh or dried, whether or not cut, crushed or powdered liquorice roots | 1
1212 | 1212.10 | Locust beans, seaweeds and other algae, sugar beet and sugarcane, fresh, chilled, frozen or dried, whether or not ground; fruit stones and kernels and other vegetable products (including unroasted chicory roots of the variety ci-chorium intybus sativum) of a kind used primarily for human consumption, not elsewhere specified or included locust beans, including locust bean seeds : of seed quality | 2
1212 | 1212.20 | Seaweeds and other algae | 2
1212 | 1212.30 | Locust beans, seaweeds and other algae, sugar beet and sugarcane, fresh, chilled, frozen or dried, whether or not ground; fruit stones and kernels and other vegetable products (including unroasted chicory roots of the variety ci-chorium intybus sativum) of a kind used primarily for human consumption, not elsewhere specified or included apricot, peach (including nectarine) or plum stones and kernels : apricot kernels | 2
1301 | 1301.10 | Lac; natural gums, resins, gum-resins and oleoresins (for example, balsams) lac : shellac | 9
1404 | 1404.10 | Vegetable products not elsewhere specified or included raw vegetable materials of a kind used primarily in dyeing or tanning : henna : henna leaves | 10
1502 | 1502.00 | Fats of Bovine animals, Sheep or Goats, other than those of heading 1503 | 0
1509 | 1509.10 | Olive oil and its fractions, whether or not refined, but not chemically modified virgin | 1
1510 | 1510.00 | Other oils and their fractions obtained solely from olives, whether or not refined, but not chemically modified, including blends of these oils or fractions with oils or fractions of heading 1509 | 3
1515 | 1515.40 | Other fixed vegetable fats and oils (including jojoba oil) and their fractions, whether or not refined, but not chemically modified - tung oil and its fractions | 1
1605 | 1605.90 | Crustaceans, molluscs and other aquatic invertebrates, prepared or preserved | 0
1701 | 1701.11 | Cane sugar | 0
2005 | 2005.90 | Other vegetables prepared or preservedotherwise than by vinegar or acetic acid, not frozen, other than products of heading 2006 other vegetables and mixtures of vegetables | 1
2009 | 2009.80 | Juice of any other single fruit or vegetable | 0
2202 | 2202.90 | Waters, including mineral and aerated waters, containing added sugar or sweetening matter, flavoured; other non-alcoholic beverages, not including fruit, nut or vegetable juices of heading no. 2009 | 4
2302 | 2302.20 | Bran, sharps and other residues, whetheror not in the form of pellets, derived from the sifting, milling or other working of cereals or of leguminous plants - of rice : de-oiled rice bran | 3
2306 | 2306.70 | Oil-cake and other solid residues, whether or not ground or in the form ofpellets, resulting from the extraction ofvegetable fats or oils, other than thoseof heading 2304 or 2305 of maize (corn) germ | 1
2403 | 2403.10 | Smoking tobacco, whether or not containing tobacco substitutes in any proportion | 0
2506 | 2506.21 | Quartz (other than natural sands); quartzite, whether or not roughly trimmed or merely cut, by sawing or otherwise, into blocks or slabs of a rectangular (including square) shape - quartzite : crude or roughly trimmed: in lumps | 3
2506 | 2506.29 | Quartz (other than natural sands); quartzite, whether or not roughly trimmed or merely cut, by sawing or otherwise, into blocks or slabs of a rectangular (including square) shape - quartzite : other | 1
2508 | 2508.20 | Other clays (not including expanded clays of heading 6806), andalusite, kyanite and sillimanite, whether or not calcined; mullite; chamotte or dinas earths - decolourising earths and fullers earth: processed (including activated) | 2
2513 | 2513.11 | Pumice stone; emery; natural corundum, natural garnet and other natural abrasives, whether or not heat-treated - pumice stone: crude or in irregular pieces, including crushed pumice (bimskies) | 1
2513 | 2513.19 | Pumice stone; emery; natural corundum, natural garnet and other natural abrasives, whether or not heat-treated - pumice stone: other | 1
2516 | 2516.21 | Granite, porphyry, basalt, sandstone and other monumental or building stone, whether or not roughly trimmed or merely cut, by sawing or otherwise, into blocks or slabs of a rectangular (including square) shape - sandstone: crude or roughly trimmed | 1
2516 | 2516.22 | Granite, porphyry, basalt, sandstone and other monumental or building stone, whether or not roughly trimmed or merely cut, by sawing or otherwise, into blocks or slabs of a rectangular (including square) shape - sandstone: merely cut, by sawing or otherwise, into blocks or slabs of a rectangular (including square) shape | 1
2518 | 2518.30 | Dolomite, whether or not calcined or sintered, including dolomite roughly trimmed or merely cut, by sawing or otherwise, into blocks or slabs of a rectangular (including square) shape; dolomite ramming mix -dolomite ramming mix | 1
2524 | 2524.00 | Asbestos - asbestos: asbestos in rock form: chrysotile | 10
2528 | 2528.90 | Natural borates and concentrates thereof (whether or not calcined), but not including borates separated from natural brine; natural boric acid containing not more than 85% of h3bo3 calculated on the dry weight- other: natural calcium borates and concentrates thereof (whether or not calcined) | 1
2707 | 2707.60 | Oils and other products of the distillation of high temperature coal tar similar products in which the weight of the aromatic constituents exceeds that of the non-aromatic constituents phenols | 1
2709 | 2709.10 | Petroleum oils and oils obtained from bituminous minerals | 1
2709 | 2709.20 | Petroleum crude | 1
2710 | 2710.11 | Light oils and preparations | 0
2811 | 2811.23 | Other inorganic acids and other inorganic oxygen compounds of non-metals - other inorganic oxygen compounds of non-metals : sulphur dioxide | 1
2812 | 2812.10 | Chlorides and chloride oxides | 13
2824 | 2824.20 | Lead oxides; red lead and orange lead -red lead and orange lead | 1
2826 | 2826.11 | Fluorides; fluorosilicates, fluoroaluminates and other complex fluorine salts - fluorides : - of ammonium or of sodium : ammonium fluorides | 2
2826 | 2826.20 | Fluorides; fluorosilicates, fluoroaluminates and other complex fluorine salts - fluorosilicates of sodium or of potassium : fluorosilicates of sodium | 2
2827 | 2827.33 | Chlorides, chloride oxides and chloride hydroxides; bromides and bromide oxides; iodides and iodide oxides - other chlorides : of iron | 1
2827 | 2827.34 | Chlorides, chloride oxides and chloride hydroxides; bromides and bromide oxides; iodides and iodide oxides - other chlorides : of cobalt | 1
2827 | 2827.36 | Chlorides, chloride oxides and chloride hydroxides; bromides and bromide oxides; iodides and iodide oxides - other chlorides : of zinc | 1
2830 | 2830.20 | Sulphides; polysulphides, whether or not chemically defined - zinc sulphide | 1
2830 | 2830.30 | Sulphides; polysulphides, whether or not chemically defined - cadmium sulphide | 1
2833 | 2833.23 | Sulphates; alums; peroxosulphates (persulphates) - other sulphates : of chromium | 1
2833 | 2833.26 | Sulphates; alums; peroxosulphates (persulphates) - other sulphates : - of zinc : agricultural grade zinc sulphate ordinarily used as micronutrient | 2
2835 | 2835.23 | Phosphinates (hypophosphites), phosphonates (phosphites) and phosphates; polyphosphates, whether or not chemically defined - phosphates : of trisodium | 1
2836 | 2836.10 | Carbonates; peroxocarbonates (percarbonates); commercial ammonium carbonate containing ammonium carbamate commercial ammonium carbonate and other ammonium carbonates | 1
2836 | 2836.70 | Carbonates; peroxocarbonates (percarbonates); commercial ammonium carbonate containing ammonium carbamate lead carbonate | 1
2839 | 2839.20 | Silicates; commercial alkali metal silicates - of potassium | 1
2841 | 2841.10 | Salts of oxometallic or peroxometallic acids - aluminates : sodium aluminate | 2
2841 | 2841.20 | Salts of oxometallic or peroxometallic acids - chromates of zinc or of lead : chromates of zinc | 2
2844 | 2844.40 | Radioactive chemical elements and radioactive isotopes (including the fissile or fertile chemical elements and isotopes) and their compounds; mixtures and residues containing these products - radioactive elements and isotopes and compounds other than those of subheadings 2844 10, 2844 20 or 2844 30; alloys, dispersions (including cermets), ceramic products and mixtures containing these elements, isotopes or compounds; radioactive residues | 1
2853 | 2853.00 | Other inorganic compounds (including distilled or conductivity water and water of similar purity); liquid air (whether or not rare gases have been removed); compressed air; amalgams, other than amalgams of precious metals | 6
2903 | 2903.30 | Halogenated derivatives of hydrocarbons - fluorinated, brominated or iodinated derivatives of acyclic hydrocarbons : fluorinated derivatives | 5
2903 | 2903.31 | Halogenated derivatives of hydrocarbons - fluorinated, brominated or iodinated derivatives of acyclic hydrocarbons -- ethylene dibromide (iso) (1,2-dibromoethane) | 1
2903 | 2903.39 | Halogenated derivatives of hydrocarbons | 5
2904 | 2904.90 | Sulphonated, nitrated or nitrosated derivatives of hydrocarbons; whether or not halogenated | 9
2905 | 2905.15 | Acyclic alcohols and their halogenated, sulphonated, nitrated or nitrosated derivatives - saturated monohydric alcohols : pentanol (amyl alcohol) and isomers thereof | 1
2906 | 2906.14 | Cyclic alcohols and their halogenated, sulphonated, nitrated or nitrosated derivatives - cyclanic, cyclenic or cycloterpenic : terpineols | 1
2907 | 2907.14 | Phenols; phenol-alcohols - monophenols : xylenols and their salts | 1
2908 | 2908.10 | Halogenated, sulphonated, nitrated or nitrosated derivatives of phenols or phenol-alcohols - derivatives containing only halogen substituents and their salts | 1
2908 | 2908.20 | Halogenated, sulphonated, nitrated or nitrosated derivatives of phenols or phenol-alcohols - derivatives containing only sulpho groups, their salts and esters : phenol sulphonic acids | 9
2908 | 2908.90 | Halogenated, sulphonated, nitrated or nitrosated derivatives of phenols or phenol-alcohols - other : para nitrophenol | 3
2909 | 2909.42 | Ethers, ether-alcohols, ether-phenols, etheralcohol- phenols, alcohol peroxides, ether peroxides, ketone peroxides (whether or not chemically defined), and their halogenated, sulphonated, nitrated or nitrosated derivatives - ether-alcohols and their halogenated, sulphonated, nitrated or nitrosated derivatives : monomethyl ethers of ethylene glycol or of diethylene glycol | 1
2912 | 2912.13 | Aldehydes, whether or not with other oxygen function; cyclic polymers of aldehydes; paraformaldehyde - acyclic aldehydes without other oxygen function : butanal (butyraldehyde, normal isomer) | 1
2914 | 2914.21 | Camphor | 0
2914 | 2914.70 | Halogenated, sulphonated, nitrated or nitrosated derivatives | 3
2915 | 2915.22 | Saturated acyclic monocarboxylic acids and their anhydrides, halides, peroxides and peroxyacids; their halogenated, sulphonated, nitrated or nitrosated derivatives - acetic acid and its salts; acetic anhydride : sodium acetate | 1
2915 | 2915.23 | Saturated acyclic monocarboxylic acids and their anhydrides, halides, peroxides and peroxyacids; their halogenated, sulphonated, nitrated or nitrosated derivatives - acetic acid and its salts; acetic anhydride : cobalt acetates | 1
2915 | 2915.34 | Saturated acyclic monocarboxylic acids and their anhydrides, halides, peroxides and peroxyacids; their halogenated, sulphonated, nitrated or nitrosated derivatives - esters of acetic acid : isobutyl acetate | 1
2915 | 2915.35 | Saturated acyclic monocarboxylic acids and their anhydrides, halides, peroxides and peroxyacids; their halogenated, sulphonated, nitrated or nitrosated derivatives - esters of acetic acid : 2-ethoxyethyl acetate | 1
2917 | 2917.31 | Polycarboxylic acids, their anhydrides, halides, peroxides and peroxyacids; their halogenated, sulphonated, nitrated or nitrosated derivatives - aromatic polycarboxylic acids, their anhydrides, halides, peroxides, peroxyacids and their derivatives :dibutyl orthophthalates | 1
2918 | 2918.90 | Carboxylic acids with additional oxygen function and their anhydrides, halides, peroxides and peroxyacids; their halogenated, sulphonated, nitrated or nitrosated derivatives - other | 1
2919 | 2919.00 | Phosphoric esters and their salts, including lactophosphates; their halogenated, sulphonated, nitrated or nitrosated derivatives - phosphoric esters and their salts, including lacto-phosphates; their halogenated, sulphonated, nitrated or nitrosated derivatives : glycerophosphoric acid | 6
2920 | 2920.10 | Esters of other inorganic acids of non-metals (excluding esters of hydrogen halides) and their salts; their halogenated, sulphonated, nitrated or nitrosated derivatives - thiophosphoric esters (phosphorothioates) and their salts; their halogenated, sulphonated, nitrated or nitrosated derivatives | 3
2922 | 2922.13 | Triethanolamine | 2
2922 | 2922.22 | Oxygen-function amino-compounds - amino-naphthols and other amino-phenols, other than those containing more than one kind of oxygen function, their ethers and esters; salts thereof : anisidines, dianisidines, phenetidines and their salts : ortho anisidines | 4
2925 | 2925.20 | Carboxyimide-function compounds (including saccharin and its salts) and imine-function compounds - imines and their derivatives; salts thereof : guanidine nitrate | 2
2930 | 2930.50 | Organosulphur compounds captafol iso and methamidophos iso | 1
2931 | 2931.00 | Other organo-inorganic compounds | 17
2931 | 2931.31 | Dimethyl methylphosphonate | 1
2931 | 2931.32 | Dimethyl propylphosphonate | 1
2931 | 2931.33 | Diethyl ethylphosphonate | 1
2931 | 2931.34 | Sodium 3-(trihydroxysilyl)propyl methylphosphonate | 1
2931 | 2931.35 | 2, 4, 6-Tripropyl-1, 3, 5, 2, 4, 6-trioxatriphosphinane 2, 4, 6-trioxide | 1
2931 | 2931.36 | (5-Ethyl-2-methyl-2-oxido-1, 3, 2-dioxaphosphinan-5-yl)methyl methylphosphonate | 1
2931 | 2931.37 | Bis[(5-ethyl-2-methyl-2-oxido-1, 3, 2-dioxaphosphinan-5-yl) methyl] methylphosphonate | 1
2931 | 2931.38 | Salt of methylphosphonic acid and (aminoiminomethyl)urea (1 1) | 1
2931 | 2931.39 | Other organo-inorganic compounds | 1
2932 | 2932.29 | Other lactones | 0
2935 | 2935.00 | Sulphonamides | 10
2936 | 2936.10 | Provitamins and vitamins, natural or reproduced by synthesis (including natural concentrates), derivatives thereof used primarily as vitamins, and intermixtures of the foregoing, whether or not in any solvent - provitamins, unmixed | 1
2937 | 2937.31 | Epinephrine | 1
2939 | 2939.21 | Vegetable alkaloids, natural or reproduced by synthesis, and their salts, ethers, esters and other derivatives - alkaloids of cinchona and their derivatives; salts thereof :-quinine and its salts : quinine alkaloids | 5
2939 | 2939.29 | Vegetable alkaloids, natural or reproduced by synthesis, and their salts, ethers, esters and other derivatives - alkaloids of cinchona and their derivatives; salts thereof : other | 3
2939 | 2939.71 | Cocaine, ecgonine, levometamfetamine, metamfetamine (INN), metamfetamine racemate; salts, esters and other derivatives thereof | 1
2939 | 2939.91 | Vegetable alkaloids, natural or reproduced by synthesis, and their salts, ethers, esters and other derivatives - other : levometamfetamine, metamfetamine(inn), metamfetamine racemate; salts, esters and other derivatives thereof | 1
2939 | 2939.99 | Vegetable alkaloids, natural or reproduced by synthesis, and their salts, ethers, esters and other derivatives - other : other | 1
3001 | 3001.10 | Glands and other organs for organo-therapeutic uses, dried, whether or not powdered; extracts of glands or other organs or of their secretions for organo-therapeutic uses; heparin and its salts; other human or animal substances prepared for therapeutic or prophylactic uses, not elsewhere specified or included glands and other organs, dried, whether or not powdered : pancreatin and dried powder of pancreas | 3
3002 | 3002.10 | Antisera, other blood fractions and immunological products, whether or not modified or obtained by biotechnological processes | 8
3002 | 3002.11 | Malaria diagnostic test kits | 1
3002 | 3002.19 | Human blood; animal blood for therapeutic, prophylactic or diagnostic uses; antisera, other blood fractions, immunological products, modified or obtained by biotechnological processes; vaccines, toxins, cultures of micro-organisms (excluding yeasts) etc | 1
3002 | 3002.20 | Vaccines for human medicine | 14
3002 | 3002.30 | Human blood; animal blood prepared for therapeutic, prophylactic or diagnostic uses; antisera and other blood fractions and modified immunological products, whether or not obtained by means of biotechnological processes; vaccines, toxins, cultures of micro-organisms (excluding yeasts) and similar products vaccines for veterinary medicine | 1
3003 | 3003.40 | Medicaments (excluding goods of heading 3002, 3005 or 3006) consisting of two or more constituents which have been mixed together for therapeutic or prophylactic uses, not put up in measured doses or in forms or packings for retail sale containing alkaloids or derivatives thereof but not containing hormones or other products of heading 2937 or antibiotics | 1
3004 | 3004.40 | Containing alkaloids or derivatives thereof but not containing hormones, other products of heading 2937 or antibiotics | 8
3006 | 3006.20 | Pharmaceutical goods specified in note 4 to this chapter blood grouping reagents | 1
3006 | 3006.80 | Pharmaceutical goods specified in note 4 to this chapter waste pharmaceuticals | 1
3102 | 3102.70 | Mineral or chemical fertilisers, nitrogenous calcium cyanamide | 1
3103 | 3103.10 | Mineral or chemical fertilisers, phosphatic superphosphates | 1
3103 | 3103.20 | Mineral or chemical fertilisers, phosphatic basic slag | 1
3104 | 3104.10 | Mineral or chemical fertilisers, potassic carnallite, sylvite and other crude natural potassium salts | 1
3206 | 3206.30 | Other colouring matter; preparations as specified in note 3 to this chapter, other than those of headings 3203, 3204 or 3205; inorganic products of a kind used as luminophores, whether or not chemically defined - pigments and preparations based on cadmium compounds | 1
3206 | 3206.43 | Other colouring matter; preparations as specified in note 3 to this chapter, other than those of headings 3203, 3204 or 3205; inorganic products of a kind used as luminophores, whether or not chemically defined - other colouring matter and other preparations : pigments and preparations based on hexacyanoferrates (ferrocyanides and ferricyanides) | 1
3301 | 3301.11 | Essential oils (terpeneless or not), including concretes and absolutes; resinoids; extracted oleoresins; concentrates of essential oils in fats, in fixed oils, in waxes or the like, obtained by enfleurage or maceration; terpenic by-products of the deterpenation of essential oils; aqueous distillates and aqueous solutions of essential oils - essential oils of citrus fruit : of bergamot | 1
3301 | 3301.14 | Essential oils (terpeneless or not), including concretes and absolutes; resinoids; extracted oleoresins; concentrates of essential oils in fats, in fixed oils, in waxes or the like, obtained by enfleurage or maceration; terpenic by-products of the deterpenation of essential oils; aqueous distillates and aqueous solutions of essential oils - essential oils of citrus fruit : of lime | 1
3301 | 3301.21 | Essential oils (terpeneless or not), including concretes and absolutes; resinoids; extracted oleoresins; concentrates of essential oils in fats, in fixed oils, in waxes or the like, obtained by enfleurage or maceration; terpenic by-products of the deterpenation of essential oils; aqueous distillates and aqueous solutions of essential oils essential oils other than those of citrus fruit:of geranium | 1
3301 | 3301.22 | Essential oils (terpeneless or not), including concretes and absolutes; resinoids; extracted oleoresins; concentrates of essential oils in fats, in fixed oils, in waxes or the like, obtained by enfleurage or maceration; terpenic by-products of the deterpenation of essential oils; aqueous distillates and aqueous solutions of essential oils essential oils other than those of citrus fruit: of jasmin : jasmin concentrate | 2
3301 | 3301.23 | Essential oils (terpeneless or not), including concretes and absolutes; resinoids; extracted oleoresins; concentrates of essential oils in fats, in fixed oils, in waxes or the like, obtained by enfleurage or maceration; terpenic by-products of the deterpenation of essential oils; aqueous distillates and aqueous solutions of essential oils essential oils other than those of citrus fruit: of lavender or of lavandin | 1
3301 | 3301.26 | Essential oils (terpeneless or not), including concretes and absolutes; resinoids; extracted oleoresins; concentrates of essential oils in fats, in fixed oils, in waxes or the like, obtained by enfleurage or maceration; terpenic by-products of the deterpenation of essential oils; aqueous distillates and aqueous solutions of essential oils essential oils other than those of citrus fruit: of vetiver | 1
3402 | 3402.11 | Anionic | 2
3402 | 3402.12 | Organic surface-active agents (other than soap), surface-active preparations, washing preparations (including auxiliary washing preparations) and cleaning preparations, whether or not containing soap, other than those of heading 3401 organic surface-active agents, whether or not put up for retail sale: cationic | 1
3402 | 3402.13 | Organic surface-active agents (other than soap), surface-active preparations, washing preparations (including auxiliary washing preparations) and cleaning preparations, whether or not containing soap, other than those of heading 3401 organic surface-active agents, whether or not put up for retail sale: non-ionic | 1
3402 | 3402.19 | Organic surface-active agents (other than soap), surface-active preparations, washing preparations (including auxiliary washing preparations) and cleaning preparations, whether or not containing soap, other than those of heading 3401 organic surface-active agents, whether or not put up for retail sale: other | 1
3402 | 3402.20 | Preparations put up for retail sale | 3
3404 | 3404.10 | Artificial waxes and prepared waxes of chemically modified lignite | 1
3603 | 3603.00 | Safety fuses; detonating fuses; percussion or detonating caps; igniters; electric detonators | 9
3702 | 3702.20 | Photographic film in rolls, sensitised, unexposed, of any material other than paper, paper-board or textiles; instant print film in rolls, sensitised, unexposed instant print film | 1
3702 | 3702.51 | Of a width not exceeding 16 mm and of a length not exceeding 14 m | 0
3702 | 3702.93 | Of a width exceeding 16 mm but not exceeding 35 mm and of a length not exceeding 30 m | 0
3702 | 3702.94 | Of a width exceeding 16 mm but not | 0
3702 | 3702.95 | Of a width exceeding 35 mm | 0
3705 | 3705.10 | Photographic paper, paperboard and textiles sensitised, unexposed for offset reproduction | 1
3705 | 3705.20 | Photographic paper, paperboard and textiles sensitised, unexposed microfilms | 1
3705 | 3705.90 | Photographic paper, paperboard and textiles sensitised, unexposed other: microfiches | 2
3805 | 3805.20 | Gum, wood or sulphate turpentine and other terpenic oils produced by the distillation or other treatment of coniferous woods; crude dipentene; sulphite turpentine and other crude para-cymene; pine oil containing alpha-terpineol as the main constituent pine oil | 1
3808 | 3808.10 | Insecticides, rodenticides, fungicides, herbicides, anti-sprouting products and plant-growth regulators, disinfectants and similar products, put up in forms or packings for retail sale or as preparations or articles (for example, sulphurtreated bands, wicks and candles, and fly-papers) insecticides: aldrin, aluminium phosphite, calcium cyanide, chlordane, chloro benzilate, ddvp,ddt: aldrin | 24
3808 | 3808.20 | Insecticides, rodenticides, fungicides, herbicides, anti-sprouting products and plant-growth regulators, disinfectants and similar products, put up in forms or packings for retail sale or as preparations or articles (for example, sulphurtreated bands, wicks and candles, and fly-papers) fungicides: maneb | 6
3808 | 3808.30 | Insecticides, rodenticides, fungicides, herbicides, anti-sprouting products and plant-growth regulators, disinfectants and similar products, put up in forms or packings for retail sale or as preparations or articles (for example, sulphurtreated bands, wicks and candles, and fly-papers) herbicides, anti-sprouting products and plant-growth regulators: chloromethyl phenozy acetic acid (m.c.p.a.) | 6
3808 | 3808.40 | Insecticides, rodenticides, fungicides, herbicides, anti-sprouting products and plant-growth regulators, disinfectants and similar products, put up in forms or packings for retail sale or as preparations or articles (for example, sulphurtreated bands, wicks and candles, and fly-papers) disinfectants | 1
3808 | 3808.50 | aldrin (ISO); binapacryl (ISO); camphechlor(ISO) (toxaphene); captafol (ISO); chlordane (ISO); chlordimeform (ISO); chlorobenzilate (ISO); DDT (ISO) (clofenotane (INN), 1, 1, 1-trichloro-2,2- bis(p-chlorphenyl) ethane); dieldrin (ISO,INN), dinoseb (ISO), its salts or its esters; ethylene dibromide (ISO) (1,2-dibromoethane); ethylene dichloride (ISO); (1,2dicholoroethane);fluroacetamide (ISO); heptachlor(ISO); hexachlorobenzene (ISO); 1,2,3,4,5,6,-hexachlorocyclohexane (HCH (ISO)), including lindane (ISO, INN); mercury compounds; methamidophos (ISO; monocrotophos (ISO); oxirane parathion-methyl (ISO) (methyl-parathion (ISO); pentachlorophenol (ISO); phosphamidon (ISO); 2,4,5-T ((ISO) (2,4,5-trichlorophenoxyacetic acid, its salts or its esters; | 1
3808 | 3808.90 | Insecticides, rodenticides, fungicides, herbicides, anti-sprouting products and plant-growth regulators, disinfectants and similar products, put up in forms or packings for retail sale or as preparations or articles (for example, sulphurtreated bands, wicks and candles, and fly-papers) other : pesticides, not elsewhere specified or included | 2
3809 | 3809.99 | Finishing agents, dye carriers to accelerate the dyeing or fixing of dye-stuffs and other products and preparations (for example, dressings and mordants), of a kind used in the textile, paper, leather or like industries, not elsewhere specified or included other: of a kind used in the leather or like industries : other | 1
3812 | 3812.30 | Anti-oxidising preparations and other compound stabilisers for rubber or plastics | 4
3822 | 3822.00 | Diagnostic or laboratory reagents on a backing, prepared diagnostic or laboratory reagents whether or not on a backing, other than those of heading 3002 or 3006; certified reference materials | 4
3824 | 3824.20 | Prepared binders for foundry moulds or cores; chemical products and preparations of the chemical or allied industries (including those consisting of mixtures of natural products), not elsewhere specified or included naphthenic acids, their water-insoluble salts and their esters: copper naphthenate | 3
3824 | 3824.71 | Prepared binders for foundry moulds or cores; chemical products and preparations of the chemical or allied industries (including those consisting of mixtures of natural products), not elsewhere specified or included- mixtures containing halogenated derivatives of methane, ethane or propane:-- containing chlorofluorocarbons (cfcs), whether or not containing hydrochlorofluorocarbons(hcfcs), perfluorocarbons (pfcs) or hydrofluorocarbons(hfcs) | 3
3824 | 3824.72 | Prepared binders for foundry moulds or cores; chemical products and preparations of the chemical or allied industries (including those consisting of mixtures of natural products), not elsewhere specified or included- mixtures containing halogenated derivatives of methane, ethane or propane:-- containing bromochlorodifluoromethane, bromotrifluoromethane or dibromotetrafluoro-ethanes | 1
3824 | 3824.73 | Prepared binders for foundry moulds or cores; chemical products and preparations of the chemical or allied industries (including those consisting of mixtures of natural products), not elsewhere specified or included- mixtures containing halogenated derivatives of methane, ethane or propane:-- containing hydrobromofluorocarbons(hbfcs) | 1
3824 | 3824.74 | Prepared binders for foundry moulds or cores; chemical products and preparations of the chemical or allied industries (including those consisting of mixtures of natural products), not elsewhere specified or included- mixtures containing halogenated derivatives of methane, ethane or propane:-- containing hydrochlorofluorocarbons(hcfcs), whether or not containing perfluorocarbons(pfcs) or hydrofluorocarbons (hfcs), but not containing chlorofluorocarbons(cfcs) | 1
3824 | 3824.75 | Prepared binders for foundry moulds or cores; chemical products and preparations of the chemical or allied industries (including those consisting of mixtures of natural products), not elsewhere specified or included- mixtures containing halogenated derivatives of methane, ethane or propane:-- containing carbon tetrachloride | 1
3824 | 3824.76 | Prepared binders for foundry moulds or cores; chemical products and preparations of the chemical or allied industries (including those consisting of mixtures of natural products), not elsewhere specified or included- mixtures containing halogenated derivatives of methane, ethane or propane:-- containing 1,1,1-trichloroethane (methyl chloroform) | 1
3824 | 3824.77 | Prepared binders for foundry moulds or cores; chemical products and preparations of the chemical or allied industries (including those consisting of mixtures of natural products), not elsewhere specified or included- mixtures containing halogenated derivatives of methane, ethane or propane:-- containing bromomethane (methyl bromide) or bromochloromethane | 1
3824 | 3824.78 | Prepared binders for foundry moulds or cores; chemical products and preparations of the chemical or allied industries (including those consisting of mixtures of natural products), not elsewhere specified or included- mixtures containing halogenated derivatives of methane, ethane or propane:-- containing perfluorocarbons (pfcs) or hydrofluorocarbons (hfcs), but not containing chlorofluorocarbons (cfcs)or hydrochlorofluorocarbons (hcfcs) | 1
3824 | 3824.79 | Prepared binders for foundry moulds or cores; chemical products and preparations of the chemical or allied industries (including those consisting of mixtures of natural products), not elsewhere specified or included- mixtures containing halogenated derivatives of methane, ethane or propane:-- other | 3
3824 | 3824.90 | Prepared binders for foundry moulds or cores; chemical products and preparations of the chemical or allied industries (including those consisting of mixtures of natural products), not elsewhere specified or included | 22
3907 | 3907.20 | Other polyethers | 2
3907 | 3907.60 | Poly (ethylene terepthalate) | 3
3909 | 3909.30 | Other amino-resins | 2
3920 | 3920.72 | Other plates, sheets, film, foil and strip, of plastics, non - cellular and not reinforced, laminated, supported or similarly combined with other materials - of cellulose or its chemical derivatives: of vulcanised fibre :rigid, plain | 3
4010 | 4010.13 | Conveyor or transmission belts or belting of vulcanised rubber - conveyor belts or belting : - reinforced only with plastics : where the rubber compound content is less than 25% by weight | 2
4011 | 4011.61 | New pneumatic tyres, of rubber - other, having a herring-bone or similar tread : of a kind used on agricultural or forestry vehicles and machines | 1
4011 | 4011.62 | New pneumatic tyres, of rubber - other, having a herring-bone or similar tread : of a kind used on construction or industrial handling vehicles and machines and having a rim size not exceeding 61 cm | 1
4011 | 4011.63 | New pneumatic tyres, of rubber - other, having a herring-bone or similar tread : of a kind used on construction or industrial handling vehicles and machines and having a rim size exceeding 61 cm | 1
4011 | 4011.69 | New pneumatic tyres, of rubber - other, having a herring-bone or similar tread : other | 1
4011 | 4011.92 | New pneumatic tyres, of rubber - other : of a kind used on agricultural or forestry vehicles and machines | 1
4011 | 4011.93 | New pneumatic tyres, of rubber - other : of a kind used on construction or industrial handling vehicles and machines and having a rim size not exceeding 61 cm | 1
4011 | 4011.94 | New pneumatic tyres, of rubber - other : of a kind used on construction or industrial handling vehicles and machines and having a rim size exceeding 61 cm | 1
4011 | 4011.99 | New pneumatic tyres, of rubber - other : other | 1
4015 | 4015.11 | Articles of apparel and clothing accessories (including gloves, mittens and mitts) for all purposes, of vulcanised rubber other than hard rubber - gloves, mittens and mitts : surgical | 1
4103 | 4103.10 | Other raw hides and skins (fresh, or salted, dried, limed, pickled or otherwise preserved, but not tanned, parchment-dressed or further prepared), whether or not dehaired or split, other than those excluded by note 1(b) or 1(c) to this chapter - of goats or kids : goat skins, pickled (wet salted) | 5
4206 | 4206.10 | Articles of gut (other than silk-worm gut), of goldbeateqs skin, of bladders or of tendons - catgut : for rackets | 2
4206 | 4206.90 | Articles of gut (other than silk-worm gut), of goldbeateqs skin, of bladders or of tendons - other | 1
4301 | 4301.70 | Raw furskins (including heads, tails, paws and other pieces or cuttings, suitable for furriers use), other than raw hides and skins of heading 4101, 4102 or 4103 - of seal, whole, with or without head, tail or paws | 1
4302 | 4302.13 | Tanned or dressed furskins (including heads, tails, paws and other pieces or cuttings), unassembled, or assembled (without the addition of other materials) other than those of heading 4303 - whole skins, with or without head, tail or paws, not assembled:of lamb, the following : astrakhan, broad tail, caracul, persian and similar lamb, indian, chinese, mongolian or tibetan lamb | 1
4401 | 4401.10 | Fuel wood, in logs, in billets, in twigs, in faggots or in similar forms | 2
4401 | 4401.40 | Sawdust and wood waste and scrap, not agglomerated | 1
4402 | 4402.00 | Wood charcoal (including shell or nut charcoal), whether or not agglomerated - wood charcoal (including shell or nut charcoal), whether or not agglomerated: of coconut shell | 2
4403 | 4403.10 | Wood in the rough, whether or not stripped of bark or sapwood, or roughly squared - treated with paint, stains, creosote or other preservatives | 1
4403 | 4403.20 | Other, coniferous | 3
4403 | 4403.92 | Wood in the rough, whether or not stripped of bark or sapwood, or roughly squared - other : of beech (fagus spp.) | 1
4406 | 4406.10 | Railway or tramway sleepers (crossties) of wood - not impregnated | 1
4406 | 4406.90 | Railway or tramway sleepers (crossties) of wood - other | 1
4407 | 4407.10 | Coniferrous | 3
4407 | 4407.24 | Wood sawn or chipped lengthwise, sliced or peeled, whether or not planed, sanded or endjointed, of a thickness exceeding 6 mm - of tropical wood specified in sub-heading note 1 to this chapter : virola, mahogany (swietenia spp.) imbuia and balsa | 1
4409 | 4409.20 | Wood (including strips and friezes for parquet flooring, not assembled) continuously shaped (tongued, grooved, rebated, chamfered, v-jointed, beaded, moulded, rounded or the like) along any of its edges or faces, whether or not planed, sanded or end-jointed - non-coniferous:planed, tongued, grooved, rebated, chamfered, v-jointed, and the like but not further moulded | 3
4410 | 4410.21 | Particle board and similar board (for example, oriented strand board and wafer board) of wood or other ligneous materials, whether or not agglomerated with resins or other organic binding substances - oriented strand-board and wafer board, of wood: unworked or not further worked than sanded | 1
4410 | 4410.29 | Particle board and similar board (for example, oriented strand board and wafer board) of wood or other ligneous materials, whether or not agglomerated with resins or other organic binding substances - oriented strand-board and wafer board, of wood: other | 1
4410 | 4410.31 | Particle board and similar board (for example, oriented strand board and wafer board) of wood or other ligneous materials, whether or not agglomerated with resins or other organic binding substances - other, of wood: unworked or not further worked than sanded: plain particle boards | 4
4410 | 4410.32 | Particle board and similar board (for example, oriented strand board and wafer board) of wood or other ligneous materials, whether or not agglomerated with resins or other organic binding substances - other, of wood: surface-covered with melamine impregnated paper: plain particle boards | 4
4410 | 4410.33 | Particle board and similar board (for example, oriented strand board and wafer board) of wood or other ligneous materials, whether or not agglomerated with resins or other organic binding substances - other, of wood: surface-covered with decorative laminates of plastics: plain particle boards | 4
4410 | 4410.39 | Particle board and similar board (for example, oriented strand board and wafer board) of wood or other ligneous materials, whether or not agglomerated with resins or other organic binding substances - other, of wood: other: plain particle boards | 4
4411 | 4411.11 | Fibreboard of wood or other ligneous materials, whether or not bonded with resins or other organic substances - fibreboard of a density exceeding 0.8 g/c - m3 - : not mechanically worked or surface covered : hardboard | 2
4411 | 4411.19 | Fibreboard of wood or other ligneous materials, whether or not bonded with resins or other organic substances - fibreboard of a density exceeding 0.8 g/c - m3 - : other : hardboard | 2
4411 | 4411.21 | Fibreboard of wood or other ligneous materials, whether or not bonded with resins or other organic substances - fibreboard of a density exceeding 0.5 g/c - m3 - but not exceeding 0.8 g/c - m3 - : not mechanically worked or surface covered:insulation board | 2
4411 | 4411.29 | Fibreboard of wood or other ligneous materials, whether or not bonded with resins or other organic substances - fibreboard of a density exceeding 0.5 g/c - m3 - but not exceeding 0.8 g/c - m3 - : other : insulation board | 2
4411 | 4411.31 | Fibreboard of wood or other ligneous materials, whether or not bonded with resins or other organic substances - fibre board of a density exceeding 0.35 g/c - m3 - but not exceeding 0.5 g/ c - m3 - : not mechanically worked or surface covered: insulation board | 2
4411 | 4411.39 | Fibreboard of wood or other ligneous materials, whether or not bonded with resins or other organic substances - fibre board of a density exceeding 0.35 g/c - m3 - but not exceeding 0.5 g/ c - m3 - : other: insulation board | 2
4411 | 4411.91 | Fibreboard of wood or other ligneous materials, whether or not bonded with resins or other organic substances - other : not mechanically worked or surface covered: insulation board (homogeneous) | 4
4411 | 4411.99 | Fibreboard of wood or other ligneous materials, whether or not bonded with resins or other organic substances - other : other: insulation board (homogenous) | 4
4412 | 4412.13 | Plywood, veneered panels and similar laminated wood - plywood, consisting solely of sheets of wood, each ply not exceeding 6 mm thickness : with at least one outer ply of tropical wood specified in sub-heading note 1 to this chapter : decorative plywood | 6
4412 | 4412.14 | Plywood, veneered panels and similar laminated wood - plywood, consisting solely of sheets of wood, each ply not exceeding 6 mm thickness : other, with at least one outer ply of non-coniferous wood : decorative plywood | 5
4412 | 4412.19 | Plywood, veneered panels and similar laminated wood - plywood, consisting solely of sheets of wood, each ply not exceeding 6 mm thickness : other : decorative plywood | 5
4412 | 4412.22 | Plywood, veneered panels and similar laminated wood - other, with at least one outer ply of nonconiferous wood : with at least one ply of tropical wood specified in sub-heading note 1 to this chapter - decorative plywood | 5
4412 | 4412.23 | Plywood, veneered panels and similar laminated wood - other, with at least one outer ply of nonconiferous wood : other, containing at least one layer of particle board: decorative plywood | 5
4412 | 4412.29 | Plywood, veneered panels and similar laminated wood - other, with at least one outer ply of nonconiferous wood : other : elastic laminated plywood | 6
4412 | 4412.32 | Other, with at least one outer ply of non-coniferous wood | 5
4412 | 4412.93 | Plywood, veneered panels and similar laminated wood - other : other, containing at least one layer of particle board: decorative plywood | 5
4412 | 4412.94 | Plywood, veneered panels and similar laminated wood - other: -- blockboard, laminboard and battenboard | 1
4414 | 4414.00 | Wooden frames for paintings, photographs, mirrors or similar objects | 1
4418 | 4418.10 | Builders` joinery and carpentry of wood, including cellular wood panels, assembled flooring panels, shingles and shakes windows, french-windows and their frames | 1
4418 | 4418.20 | Doors and their frames and thresholds | 3
4418 | 4418.60 | Builders` joinery and carpentry of wood, including cellular wood panels, assembled flooring panels, shingles and shakes - posts and beams | 1
4418 | 4418.71 | Builders` joinery and carpentry of wood, including cellular wood panels, assembled flooring panels, shingles and shakes - assembled flooring panels :-- for mosaic floors | 1
4418 | 4418.72 | Builders` joinery and carpentry of wood, including cellular wood panels, assembled flooring panels, shingles and shakes - assembled flooring panels :--other, multilayer | 1
4418 | 4418.90 | Builders` joinery and carpentry of wood, including cellular wood panels, assembled flooring panels, shingles and shakes - shingles and shakes | 1
4419 | 4419.00 | Tableware and kitchenware, of wood | 2
4420 | 4420.10 | Wood marquetry and inlaid wood; caskets and cases for jewellery or cutlery, and similar articles, of wood; statuettes and other ornaments, of wood; wooden articles of furniture not falling in chapter 94 - statuettes and other ornaments, of wood | 1
4421 | 4421.90 | Wooden articles n.e.c. in heading no. 4414 to 4420 | 12
4601 | 4601.20 | Plaits and similar products of plaiting materials, whether or not assembled into strips ; plaiting materials, plaits and similar products of plaiting materials, bound together in parallel strands or woven, in sheet form, whether or not being finished articles (for example, mats, matting, screens) - mats, matting and screens of vegetable materials : mats and matting of coir, bound in parallel strands | 3
4601 | 4601.91 | Plaits and similar products of plaiting materials, whether or not assembled into strips ; plaiting materials, plaits and similar products of plaiting materials, bound together in parallel strands or woven, in sheet form, whether or not being finished articles (for example, mats, matting, screens) - other : of vegetable materials | 1
4602 | 4602.10 | Basketwork, wickerwork and other articles, made directly to shape from plaiting materials or made up from goods of heading 46 01; articles of loofah of vegetable materials : of palm leaves : baskets | 3
4802 | 4802.30 | Uncoated paper and paperboard, of a kind used for writing, printing or other graphic purposes, and non-perforated punch card and punch tape paper, in rolls or rectangular (including square) sheets of any size, other than paper of heading 4801 or 4803; hand-made paper and paperboard carbonising base paper | 1
4809 | 4809.10 | Carbon paper, self-copy paper and other copying or transfer papers (including coated or impregnated paper for duplicator stencils or offset plates), whether or not printed, in rolls or sheets - carbon or similar copying papers : manifold paper | 2
4814 | 4814.30 | Wallpaper and similar wall coverings; window transparencies of paper - wallpaper and similar wall coverings, consisting of paper covered, on the face side, with plaiting material, whether or not bound together in parallel strands or woven | 1
4816 | 4816.10 | Carbon-paper, self-copy paper and other copying or transfer papers (other than those of heading 4809), duplicator stencils and offset plates, of paper, whether or not put up in boxes - carbon or similar copying papers | 1
4816 | 4816.30 | Carbon-paper, self-copy paper and other copying or transfer papers (other than those of heading 4809), duplicator stencils and offset plates, of paper, whether or not put up in boxes duplicator stencils | 1
4818 | 4818.40 | Sanitary towels and tampons, napkins and napkin liners for babies and similar sanitary articles | 0
4823 | 4823.12 | Other paper, paperboard, cellulose wadding and webs of cellulose fibres, cut to size or shape; other articles of paper pulp, paper, paperboard, cellulose wadding or webs of cellulose fibres - gummed or adhesive paper, in strips or rolls : self-adhesive | 1
4823 | 4823.19 | Other paper, paperboard, cellulose wadding and webs of cellulose fibres, cut to size or shape; other articles of paper pulp, paper, paperboard, cellulose wadding or webs of cellulose fibres - gummed or adhesive paper, in strips or rolls : other | 1
4823 | 4823.60 | Other paper, paperboard, cellulose wadding and webs of cellulose fibres, cut to size or shape; other articles of paper pulp, paper, paperboard, cellulose wadding or webs of cellulose fibres - trays, dishes, plates, cups and the like, of paper and paperboard | 1
4905 | 4905.10 | Maps and hydrographic or similar charts of all kinds, including atlases, wall maps, topographical plans and globes, printed globes | 1
4905 | 4905.91 | Maps and hydrographic or similar charts of all kinds, including atlases, wall maps, topographical plans and globes, printed - other : in book form | 1
4905 | 4905.99 | Maps and hydrographic or similar charts of all kinds, including atlases, wall maps, topographical plans and globes, printed | 2
5003 | 5003.10 | Silk waste (including cocoons unsuitable for reeling, yarn waste and garnetted stock) not carded or combed mulberry silk waste | 3
5003 | 5003.90 | Silk waste (including cocoons unsuitable for reeling, yarn waste and garnetted stock) - other : mulberry silk waste | 5
5208 | 5208.53 | Woven fabrics of cotton, containing 85% or more by weight of cotton, weighing not more than 200 g/m2- printed : 3-thread or 4-thread twill, including cross twill :shirting fabrics | 3
5210 | 5210.12 | Woven fabrics of cotton, containing less than 85% by weight of cotton, mixed mainly or solely with man-made fibres, weighing not more than 200 g/m2- unbleached : 3-thread or 4-thread twill, including cross twill :shirting fabrics | 2
5210 | 5210.22 | Woven fabrics of cotton, containing less than 85% by weight of cotton, mixed mainly or solely with man-made fibres, weighing not more than 200 g/m2- bleached :3-thread or 4-thread twill, including cross twill : - handloom :crepe fabrics including crepe checks | 5
5210 | 5210.42 | Woven fabrics of cotton, containing less than 85% by weight of cotton, mixed mainly or solely with man-made fibres, weighing not more than 200 g/m2- of yarns of different colours : 3-thread or 4-thread twill, including cross twill :bleeding madras | 7
5210 | 5210.52 | Woven fabrics of cotton, containing less than 85% by weight of cotton, mixed mainly or solely with man-made fibres, weighing not more than 200 g/m2- printed : 3-thread or 4-thread twill, including cross twill :crepe fabrics including crepe checks | 3
5211 | 5211.21 | Woven fabrics of cotton, containing less than 85% by weight of cotton, mixed mainly or solely with man-made fibres, weighing more than 200 g/m2 - bleached :plain weave :shirting fabrics | 6
5211 | 5211.22 | Woven fabrics of cotton, containing less than 85% by weight of cotton, mixed mainly or solely with man-made fibres, weighing more than 200 g/m2 - bleached :3-thread or 4-thread twill, including cross twill :crepe fabrics including crepe checks | 4
5211 | 5211.29 | Woven fabrics of cotton, containing less than 85% by weight of cotton, mixed mainly or solely with man-made fibres, weighing more than 200 g/m2 - bleached :other fabrics :zari bordered sari | 3
5305 | 5305.11 | Coconut, abaca (manila hemp or musa textilis nee), ramie and other vegetable textile fibres, not elsewhere specified or included, raw or processed but not spun; tow, noils and waste of these fibres (including yarn waste and garnetted stock) of coconut (coir) : raw : coir bristle fibre | 5
5305 | 5305.19 | Coconut, abaca (manila hemp or musa textilis nee), ramie and other vegetable textile fibres, not elsewhere specified or included, raw or processed but not spun; tow, noils and waste of these fibres (including yarn waste and garnetted stock) of coconut (coir) :other | 1
5305 | 5305.21 | Coconut, abaca (manila hemp or musa textilis nee), ramie and other vegetable textile fibres, not elsewhere specified or included, raw or processed but not spun; tow, noils and waste of these fibres (including yarn waste and garnetted stock) of abaca : raw | 1
5305 | 5305.29 | Coconut, abaca (manila hemp or musa textilis nee), ramie and other vegetable textile fibres, not elsewhere specified or included, raw or processed but not spun; tow, noils and waste of these fibres (including yarn waste and garnetted stock) of abaca :other | 1
5305 | 5305.90 | Coconut, abaca (manila hemp or musa textilis nee), ramie and other vegetable textile fibres, not elsewhere specified or included, raw or processed but not spun; tow, noils and waste of these fibres (including yarn waste and garnetted stock) other : ramie or china grass | 2
5402 | 5402.10 | Synthetic filament yarn (other than sewing thread), not put up for retail sale, including synthetic monofilament of less than 67 decitex high tenacity yarn of nylon or other polyamides : nylon tyre yarn | 2
5402 | 5402.41 | Synthetic filament yarn (other than sewing thread), not put up for retail sale, including synthetic monofilament of less than 67 decitex other yarn, single, untwisted or with a twist not exceeding 50 turns per metre : of nylon or other polyamides | 1
5402 | 5402.42 | Synthetic filament yarn (other than sewing thread), not put up for retail sale, including synthetic monofilament of less than 67 decitex other yarn, single, untwisted or with a twist not exceeding 50 turns per metre : of polyesters, partially oriented | 1
5402 | 5402.43 | Synthetic filament yarn (other than sewing thread), not put up for retail sale, including synthetic monofilament of less than 67 decitex other yarn, single, untwisted or with a twist not exceeding 50 turns per metre : of polyesters, other | 1
5403 | 5403.20 | Artificial filament yarn (other than sewing thread), not put for retail sale, including artificial mono filament of less than 67 decitex textured yarn | 1
5404 | 5404.10 | Synthetic monofilament of 67 decitex or more and of which no cross-sectional dimension exceeds 1 mm; strip and the like (for example, artificial straw) of synthetic textile materials of an apparent width not exceeding 5 mm monofilament | 1
5406 | 5406.10 | Man-made filament yarn (other than sewing thread), put up for retail sale synthetic filament yarn | 1
5406 | 5406.20 | Man-made filament yarn (other than sewing thread), put up for retail sale artificial filament yarn | 1
5501 | 5501.10 | Synthetic filament tow - of nylon or other polyamides | 1
5502 | 5502.00 | Artificial filament tow | 3
5503 | 5503.10 | Synthetic staple fibres, not carded, combed or otherwise processed for spinning - of nylon or other polyamides | 1
5513 | 5513.22 | Woven fabrics of synthetic staple fibres, containing less than 85% by weight of such fibres, mixed mainly or solely with cotton, of a weight not exceeding 170 g/m2 - dyed : 3-thread or 4-thread twill, including cross twill, of polyester staple fibres | 1
5513 | 5513.32 | Woven fabrics of synthetic staple fibres, containing less than 85% by weight of such fibres, mixed mainly or solely with cotton, of a weight not exceeding 170 g/m2 - of yarns of different colours : 3-thread or 4-thread twill, including cross twill, of polyester staple fibres | 1
5513 | 5513.33 | Woven fabrics of synthetic staple fibres, containing less than 85% by weight of such fibres, mixed mainly or solely with cotton, of a weight not exceeding 170 g/m2 - of yarns of different colours : other woven fabrics of polyester staple fibres | 1
5513 | 5513.42 | Woven fabrics of synthetic staple fibres, containing less than 85% by weight of such fibres, mixed mainly or solely with cotton, of a weight not exceeding 170 g/m2 - printed : 3-thread or 4-thread twill, including cross twill, of polyester staple fibres | 1
5513 | 5513.43 | Woven fabrics of synthetic staple fibres, containing less than 85% by weight of such fibres, mixed mainly or solely with cotton, of a weight not exceeding 170 g/m2 - printed : other woven fabrics of polyester staple fibres | 1
5514 | 5514.13 | Woven fabrics of synthetic staple fibres, containing less than 85% by weight of such fibres, mixed mainly or solely with cotton, of a weight exceeding 170 g/m2 - unbleached or bleached : other woven fabrics of polyester staple fibres : unbleached | 2
5514 | 5514.31 | Woven fabrics of synthetic staple fibres, containing less than 85% by weight of such fibres, mixed mainly or solely with cotton, of a weight exceeding 170 g/m2 - of yarns of different colours : of polyester staple fibres, plain weave | 1
5514 | 5514.32 | Woven fabrics of synthetic staple fibres, containing less than 85% by weight of such fibres, mixed mainly or solely with cotton, of a weight exceeding 170 g/m2 - of yarns of different colours : 3-thread or 4-thread twill, including cross twill, of polyester staple fibres | 1
5514 | 5514.33 | Woven fabrics of synthetic staple fibres, containing less than 85% by weight of such fibres, mixed mainly or solely with cotton, of a weight exceeding 170 g/m2 - of yarns of different colours : other woven fabrics of polyester staple fibres | 1
5514 | 5514.39 | Woven fabrics of synthetic staple fibres, containing less than 85% by weight of such fibres, mixed mainly or solely with cotton, of a weight exceeding 170 g/m2 - of yarns of different colours : other woven fabrics | 1
5515 | 5515.92 | Other woven fabrics of synthetic staple fibres - other woven fabrics : mixed mainly or solely with wool or fine animal hair : unbleached | 5
5601 | 5601.10 | Wadding of textile materials and articles thereof; textile fibres, not exceeding 5 mm in length (flock), textile dust and mill neps sanitary towels and tampons, napkins and napkin liners for babies and similar sanitary articles, of wadding | 1
5604 | 5604.20 | Rubber thread and cord, textile covered; textile yarn, and strip and the like of heading 5404 or 5405, impregnated, coated, covered or sheathed with rubber or plastics - high tenacity yarn of polyesters, of nylon or other polyamides or of viscose rayon, impregnated or coated : imitation gut (nylon) for rackets | 2
5607 | 5607.10 | Twine, cordage, ropes and cables, whether or not plaited or braided and whether or not impregnated, coated, covered or sheathed with rubber or plastics - of jute or other textile bast fibres of heading 5303 : cordage, cable, rope and twine of jute | 2
5607 | 5607.30 | Twine, cordage, ropes and cables, whether or not plaited or braided and whether or not impregnated, coated, covered or sheathed with rubber or plastics of abaca (manila hemp or musa textillis nee) or other hard (leaf) fibres | 1
5702 | 5702.51 | Carpets and other textile floor coverings, woven, not tufted or flocked, whether or not made up, including kelem, schumacks, karamanie and similar hand - woven rugs - other, not of pile construction, not made up : of wool or fine animal hair : carpets | 4
5702 | 5702.52 | Carpets and other textile floor coverings, woven, not tufted or flocked, whether or not made up, including kelem, schumacks, karamanie and similar hand - woven rugs - other, not of pile construction, not made up : of man - made textile materials : carpets, carpeting and rugs | 3
5702 | 5702.59 | Carpets and other textile floor coverings, woven, not tufted or flocked, whether or not made up, including kelem, schumacks, karamanie and similar hand - woven rugs - other, not of pile construction, not made up : of other textile materials : carpets and other floor coverings, of cotton other than durrie | 4
5703 | 5703.20 | Of nylon or other polyamides | 3
5703 | 5703.30 | Of other man-made textile materials | 3
5801 | 5801.34 | Warp pile fabrics, epingle (uncut) | 0
5802 | 5802.11 | Terry towelling and similar woven terry fabrics, other than narrow fabrics of heading 5806; tufted textile fabrics, other than products of heading 5703 - terry towelling and similar woven terry fabrics, of cotton:unbleached | 1
5802 | 5802.19 | Fabrics; terry towelling and similar woven terry fabrics other than narrow fabrics of heading no. 5806; tufted textile fabrics, excluding products of heading no. 5703 | 6
5803 | 5803.10 | Gauze, other than narrow fabrics of heading 5806 5803 10 - of cotton:unbleached | 6
5803 | 5803.90 | Gauze, other than narrow fabrics of heading 5806 5803 10 - of other textile materials:of silk or silk waste | 4
5902 | 5902.30 | Tyre cord fabric of high tenacity yarn of nylon or other polyamides, polyesters or viscose rayon - other : impregnated with rubber | 2
5905 | 5905.10 | Textile wall coverings - textile wall coverings : fixed on the backing of any material | 2
6005 | 6005.10 | Warp knit fabrics (including those made on galloon knitting machines), other than those of headings 6001 to 6004 - of wool or fine animal hair | 1
6005 | 6005.31 | Warp knit fabrics (including those made on galloon knitting machines), other than those of headings 6001 to 6004 - of synthetic fibres :unbleached or bleached | 1
6005 | 6005.32 | Warp knit fabrics (including those made on galloon knitting machines), other than those of headings 6001 to 6004 - of synthetic fibres :dyed | 1
6005 | 6005.33 | Warp knit fabrics (including those made on galloon knitting machines), other than those of headings 6001 to 6004 - of synthetic fibres : of yarns of different colours | 1
6005 | 6005.34 | Warp knit fabrics (including those made on galloon knitting machines), other than those of headings 6001 to 6004 - of synthetic fibres :printed | 1
6101 | 6101.10 | Mens or boys overcoats, carcoats, capes, cloaks, anoraks (including ski-jackets), wind-cheaters, windjackets and similar articles, knitted or crocheted, other than those of heading 6103 - of wool or fine animal hair : of wool | 3
6103 | 6103.11 | Mens or boys suits, ensembles, jackets, blazers, trousers, bib and brace overalls, breeches and shorts (other than swim wear), knitted or crocheted - suits : of wool or fine animal hair | 1
6103 | 6103.12 | Mens or boys suits, ensembles, jackets, blazers, trousers, bib and brace overalls, breeches and shorts (other than swim wear), knitted or crocheted - suits : of synthetic fibres | 1
6103 | 6103.19 | Mens or boys suits, ensembles, jackets, blazers, trousers, bib and brace overalls, breeches and shorts (other than swim wear), knitted or crocheted - suits :other : of silk | 4
6103 | 6103.21 | Mens or boys suits, ensembles, jackets, blazers, trousers, bib and brace overalls, breeches and shorts (other than swim wear), knitted or crocheted - ensembles : of wool or fine animal hair | 1
6104 | 6104.11 | Womens or girls suits, ensembles, jackets, blazers, dresses, skirts, divided skirts, trousers, bib and brace overalls, breeches and shorts (other than swim wear), knitted or crocheted - suits : of wool or fine animal hair | 1
6104 | 6104.12 | Womens or girls suits, ensembles, jackets, blazers, dresses, skirts, divided skirts, trousers, bib and brace overalls, breeches and shorts (other than swim wear), knitted or crocheted - suits : of cotton | 1
6104 | 6104.21 | Womens or girls suits, ensembles, jackets, blazers, dresses, skirts, divided skirts, trousers, bib and brace overalls, breeches and shorts (other than swim wear), knitted or crocheted - ensembles : of wool or fine animal hair | 1
6107 | 6107.92 | Mens or boys underpants, briefs, nightshirts, pyjamas, bathrobes, dressing gowns and similar articles, knitted or crocheted - other :of man-made fibres : of synthetic fibres | 2
6111 | 6111.10 | Babies garments and clothing accessories, knitted or crocheted - of wool or fine animal hair | 1
6114 | 6114.10 | Other garments, knitted or crocheted - of wool or fine animal hair | 1
6115 | 6115.11 | Panty hose, tights, stockings, socks and other hosiery, including stockings for varicose veins and footwear without applied soles, knitted or crocheted - panty hose and tights : of synthetic fibres, measuring per single yarn less than 67 decitex | 1
6115 | 6115.12 | Panty hose, tights, stockings, socks and other hosiery, including stockings for varicose veins and footwear without applied soles, knitted or crocheted - panty hose and tights : of synthetic fibres measuring per single yarn 67 decitex or more | 1
6115 | 6115.19 | Panty hose, tights, stockings, socks and other hosiery, including stockings for varicose veins and footwear without applied soles, knitted or crocheted - panty hose and tights :of other textile materials : of silk | 4
6115 | 6115.20 | Panty hose, tights, stockings, socks and other hosiery, including stockings for varicose veins and footwear without applied soles, knitted or crocheted womens full-length or knee-length hosiery measuring per single yarn less than 67 decitex : of cotton | 2
6115 | 6115.91 | Panty hose, tights, stockings, socks and other hosiery, including stockings for varicose veins and footwear without applied soles, knitted or crocheted - other : of wool or fine animal hair | 1
6115 | 6115.92 | Panty hose, tights, stockings, socks and other hosiery, including stockings for varicose veins and footwear without applied soles, knitted or crocheted - other : of cotton | 1
6115 | 6115.93 | Panty hose, tights, stockings, socks and other hosiery, including stockings for varicose veins and footwear without applied soles, knitted or crocheted - other : of synthetic fibres | 1
6117 | 6117.20 | Other made up clothing accessories, knitted or crocheted; knitted or crocheted parts of garments or of clothing accessories ties, bow ties and cravats : of silk | 5
6201 | 6201.11 | Mens or boys overcoats, car-coats, cloaks, anoraks (including ski-jackets), windcheaters, wind-jackets and similar articles other than those of heading 6203 - overcoats, raincoats, car-coats, capes, cloaks and similar articles : of wool and fine animal hair | 1
6201 | 6201.12 | Of cotton | 2
6201 | 6201.13 | Of man-made fibres | 2
6201 | 6201.19 | Of other textile materials | 2
6201 | 6201.91 | Mens or boys overcoats, car-coats, cloaks, anoraks (including ski-jackets), windcheaters, wind-jackets and similar articles other than those of heading 6203 - other : of wool or fine animal hair | 1
6201 | 6201.92 | Mens or boys overcoats, car-coats, cloaks, anoraks (including ski-jackets), windcheaters, wind-jackets and similar articles other than those of heading 6203 - other : of cotton | 1
6201 | 6201.93 | Mens or boys overcoats, car-coats, cloaks, anoraks (including ski-jackets), windcheaters, wind-jackets and similar articles other than those of heading 6203 - other : of man-made fibres | 1
6201 | 6201.99 | Of other textile materials | 2
6202 | 6202.11 | Of wool or fine animal hair | 2
6202 | 6202.12 | Womens or girls overcoats, car-coats, capes, cloaks, anoraks (including ski-jackets), wind-cheaters, wind-jackets and similar articles, other than those of heading 6204 - overcoats, raincoats, car-coats, capes, cloaks and similar articles : of cotton | 1
6202 | 6202.13 | Womens or girls overcoats, car-coats, capes, cloaks, anoraks (including ski-jackets), wind-cheaters, wind-jackets and similar articles, other than those of heading 6204 - overcoats, raincoats, car-coats, capes, cloaks and similar articles : of man-made fibres | 1
6202 | 6202.19 | Of other textile materials | 3
6202 | 6202.91 | Of wool or fine animal hair | 2
6202 | 6202.92 | Of cotton | 2
6202 | 6202.93 | Of man-made fibres | 2
6202 | 6202.99 | Of other textile materials | 3
6203 | 6203.21 | Mens or boys suits, ensembles, jackets, blazers, trousers, bib and brace overalls, breeches and shorts (other than swimwear) - ensembles : of wool or fine animal hair | 1
6204 | 6204.99 | Suits, ensembles, jackets, dresses, skirts, divided skirts, trousers, bib and brace overalls, breeches and shorts (other than swimwear); women's or girls' (not knitted or crocheted) | 0
6205 | 6205.10 | Mens or boys shirts - of wool or fine animal hair | 1
6207 | 6207.92 | Mens or boys singlets and other vests, underpants, briefs, nightshirts, pyjamas, bathrobes, dressing gowns and similar articles - other : of man-made fibres | 1
6209 | 6209.10 | Babies garments and clothing accessories - of wool or fine animal hair | 1
6211 | 6211.31 | Track suits, ski suits and swimwear; other garments - other garments, mens or boys: of wool or fine animal hair | 1
6213 | 6213.10 | Handkerchiefs - of silk or silk waste | 1
6302 | 6302.52 | Bed linen, table linen, toilet linen and kitchen linen other table linen: of flax | 1
6302 | 6302.92 | Bed linen, table linen, toilet linen and kitchen linen other: of flax | 1
6303 | 6303.11 | Curtains (including drapes) and interior blinds; curtain or bed valances knitted or crocheted: of cotton | 1
6306 | 6306.11 | Tarpaulins, awnings and sunblinds; tents; sails for boats, sailboards or landcraft; camping goods tarpaulins, awnings and sunblinds: of cotton | 1
6306 | 6306.21 | Tarpaulins, awnings and sunblinds; tents; sails for boats, sailboards or landcraft; camping goods tents: of cotton | 1
6306 | 6306.31 | Tarpaulins, awnings and sunblinds; tents; sails for boats, sailboards or landcraft; camping goods sails: of synthetic fibres | 1
6306 | 6306.39 | Tarpaulins, awnings and sunblinds; tents; sails for boats, sailboards or landcraft; camping goods sails: of other textile materials: of cotton | 2
6306 | 6306.41 | Tarpaulins, awnings and sunblinds; tents; sails for boats, sailboards or landcraft; camping goods pneumatic mattresses: of cotton | 1
6306 | 6306.49 | Tarpaulins, awnings and sunblinds; tents; sails for boats, sailboards or landcraft; camping goods pneumatic mattresses: of other textile materials | 1
6401 | 6401.91 | Waterproof footwear with outer soles and uppers of rubber or of plastics, the uppers of which are neither fixed to the sole nor assembled by stitching, riveting, nailing, screwing, plugging or similar processes other footwear : covering the knee: of rubber | 2
6402 | 6402.30 | Other footwear with outer soles and uppers of rubber or plastics other footwear, incorporating a protective metal toe-cap: of rubber | 2
6403 | 6403.30 | Footwear with outer soles of rubber, plastics, leather or composition leather and uppers of leather footwear made on a base or platform of wood, not having an inner sole or a protective metal toe-cap | 1
6406 | 6406.99 | Of other materials | 0
6506 | 6506.92 | Other headgear, whether or not lined or trimmed other:of furskin | 1
6603 | 6603.10 | Parts, trimmings and accessories of articles of heading 6601 to 6602- handles and knobs:umbrella handles with or without stems, plastic | 2
6802 | 6802.22 | Worked monumental or building stone (except slate) and articles thereof, other than goods of heading 6801; mosaic cubes and the like, of natural stone (including slate), whether or not on a backing; artificially coloured granules, chippings and powder, of natural stone (including slate) - other monumental or building stone and articles thereof, simply cut or sawn, with a flat or even surface : other calcareous stone | 1
6811 | 6811.10 | Articles of asbestos-cement, of cellulose fibrecement or the like corrugated sheets | 1
6811 | 6811.20 | Articles of asbestos-cement, of cellulose fibrecement or the like other sheets, panels, tiles and similar articles: asbestos-cement sheets | 3
6811 | 6811.30 | Articles of asbestos-cement, of cellulose fibrecement or the like tubes, pipes and tube or pipe fittings: asbestos-cement pipes | 2
6811 | 6811.90 | Articles of asbestos-cement, of cellulose fibrecement or the like other articles | 1
6812 | 6812.50 | Fabricated asbestos fibres; mixtures with a basis of asbestos or with a basis of asbestos and magnesium carbonate; articles of such mixtures or of asbestos (for example, thread, woven fabric, clothing, headgear, footwear, gaskets), whether or not reinforced, other than goods of heading 6811 or 6813 clothing, clothing accessories, footwear and headgear | 1
6812 | 6812.60 | Fabricated asbestos fibres; mixtures with a basis of asbestos or with a basis of asbestos and magnesium carbonate; articles of such mixtures or of asbestos (for example, thread, woven fabric, clothing, headgear, footwear, gaskets), whether or not reinforced, other than goods of heading 6811 or 6813 paper, millboard and felt: millboard: asbestos | 3
6812 | 6812.70 | Fabricated asbestos fibres; mixtures with a basis of asbestos or with a basis of asbestos and magnesium carbonate; articles of such mixtures or of asbestos (for example, thread, woven fabric, clothing, headgear, footwear, gaskets), whether or not reinforced, other than goods of heading 6811 or 6813 compressed asbestos fibre jointing, in sheets or rolls | 1
6812 | 6812.90 | Fabricated asbestos fibres; mixtures with a basis of asbestos or with a basis of asbestos and magnesium carbonate; articles of such mixtures or of asbestos (for example, thread, woven fabric, clothing, headgear, footwear, gaskets), whether or not reinforced, other than goods of heading 6811 or 6813 other: lagging compounds: asbestos | 5
6812 | 6812.92 | Paper, millboard and felt | 3
6812 | 6812.93 | Compressed asbestos fibre jointing in sheets or rolls | 1
6813 | 6813.10 | Friction material and articles thereof (for example, sheets, rolls, strips, segments, discs, washers, pads), not mounted, for brakes, for clutches or the like, with a basis of asbestos, of other mineral substances or of cellulose, whether or not combined with textile or other materials brake linings and pads | 1
6813 | 6813.90 | Friction material and articles thereof (for example, sheets, rolls, strips, segments, discs, washers, pads), not mounted, for brakes, for clutches or the like, with a basis of asbestos, of other mineral substances or of cellulose, whether or not combined with textile or other materials other: asbestos friction materials | 2
6813 | 6813.91 | Friction material and articles thereof (for example, sheets, rolls, strips, segments, discs, washers, pads), not mounted, for brakes, for clutches or the like, with a basis of asbestos, of other mineral substances or of cellulose, whether or not combined with textile or other materials other: -- not containing asbestos -- other | 1
6815 | 6815.10 | Non-electrical articles of graphite or other carbon | 3
6907 | 6907.10 | Tiles, cubes and similar articles, whether or not rectangular, the largest surface area of which is capable of being enclosed in a square the side of which is less than 7 cm | 2
6907 | 6907.90 | Ceramic flags and paving, hearth or wall tiles; ceramic mosaic cubes and the like, whether or not on a backing; finishing ceramics | 2
7013 | 7013.21 | Glassware of a kind used for table, kitchen, toilet, office, indoor decoration or similar purposes (other than that of heading 7010 or 7018) - drinking glasses other than of glass-ceramics : of lead crystal | 1
7013 | 7013.29 | Glassware of a kind used for table, kitchen, toilet, office, indoor decoration or similar purposes (other than that of heading 7010 or 7018) - drinking glasses other than of glass-ceramics : other | 1
7013 | 7013.31 | Glassware of a kind used for table, kitchen, toilet, office, indoor decoration or similar purposes (other than that of heading 7010 or 7018) - glassware of a kind used for table (other than drinking glasses) or kitchen purposes other than of glass-ceramics : of lead crystal | 1
7013 | 7013.32 | Glassware of a kind used for table, kitchen, toilet, office, indoor decoration or similar purposes (other than that of heading 7010 or 7018) - glassware of a kind used for table (other than drinking glasses) or kitchen purposes other than of glass-ceramics : of glass having a linear coefficient of expansion not exceeding 5 x 10-6 per kelvin within a temperature range of 00c to 3000c | 1
7013 | 7013.39 | Glassware of a kind used for table, kitchen, toilet, office, indoor decoration or similar purposes (other than that of heading 7010 or 7018) - glassware of a kind used for table (other than drinking glasses) or kitchen purposes other than of glass-ceramics : other | 1
7019 | 7019.31 | Glass fibres (including glass wool) and articles thereof (for example, yarn, woven fabrics) - thin sheets (voiles), webs, mats, mattresses, boards and similar non-woven products : mats | 1
7019 | 7019.32 | Glass fibres (including glass wool) and articles thereof (for example, yarn, woven fabrics) - thin sheets (voiles), webs, mats, mattresses, boards and similar non-woven products : thin sheets (voiles) | 1
7019 | 7019.39 | Glass fibres (including glass wool) and articles thereof (for example, yarn, woven fabrics) - thin sheets (voiles), webs, mats, mattresses, boards and similar non-woven products : other | 1
7019 | 7019.40 | Glass fibres (including glass wool) and articles thereof (for example, yarn, woven fabrics) - woven fabrics of rovings | 1
7019 | 7019.51 | Glass fibres (including glass wool) and articles thereof (for example, yarn, woven fabrics) - other woven fabrics : of a width not exceeding 30 cm | 1
7019 | 7019.52 | Glass fibres (including glass wool) and articles thereof (for example, yarn, woven fabrics) - other woven fabrics : of a width exceeding 30 cm, plain weave, weighing less than 250 g/sq. metre, of filaments measuring per single yarn not more than 136 tex | 1
7019 | 7019.59 | Glass fibres (including glass wool) and articles thereof (for example, yarn, woven fabrics) - other woven fabrics : other | 1
7104 | 7104.20 | Other, unworked or simply sawn or roughly shaped | 3
7104 | 7104.90 | Synthetic or reconstructed precious or semi-precious stones, whether or not worked or graded but not strung,mounted or set; ungraded synthetic or reconstructed precious or semi-precious stones, temporarily strung for convenience of transport-other--laboratory created or laboratory grown or manmade or cultured or synthetic diamonds | 2
7225 | 7225.20 | Flat-rolled products of other alloy steel, of a width of 600 mm or more - of high speed steel : hot-rolled : in coils | 4
7226 | 7226.93 | Flat-rolled products of other alloy steel, of a width of less than 600 mm - other: electrolytically plated or coated with zinc | 1
7226 | 7226.94 | Flat-rolled products of other alloy steel, of a width of less than 600 mm - other: otherwise plated or coated with zinc | 1
7229 | 7229.10 | Wire of other alloy steel of high speed steel | 1
7304 | 7304.10 | Tubes, pipes and hollow profiles, seamless, of iron (other than cast iron) or steel - line pipe of a kind used for oil or gas pipelines : pipes of iron or steel : of iron | 4
7304 | 7304.21 | Tubes, pipes and hollow profiles, seamless, of iron (other than cast iron) or steel - casing, tubing and drill pipe, of a kind used in drilling for oil or gas : drill pipe : of iron | 2
7306 | 7306.10 | Other tubes, pipes and hollow profiles (for example, open seam or welded, riveted or similarly closed), of iron or steel - line pipe of a kind used for oil or gas pipelines : galvanised pipes : of iron | 4
7306 | 7306.20 | Other tubes, pipes and hollow profiles (for example, open seam or welded, riveted or similarly closed), of iron or steel - casing and tubing of a kind used in drilling for oil or gas : of iron | 2
7306 | 7306.60 | Other tubes, pipes and hollow profiles (for example, open seam or welded, riveted or similarly closed), of iron or steel - other, welded, of non-circular cross-section : of iron | 2
7314 | 7314.13 | Cloth (including endless bands), grill, netting and fencing, of iron or steel wire; expanded metal of iron or steel - woven cloth : other endless bands for machinery | 1
7319 | 7319.10 | Sewing needles, knitting needles, bodkins, crochet hooks, embroidery stilettos and similar articles, for use in the hand, of iron or steel; safety pins and other pins, of iron or steel, not elsewhere specified or included - sewing, darning or embroidery needles : harness needles | 3
7321 | 7321.13 | Stoves, ranges, grates, cookers (including those with subsidiary boilers for central heating), barbecues, braziers, gas-rings, plate warmers and similar non-electric domestic appliances, and parts thereof, of iron or steel - cooking appliances and plate warmers: for solid fuel: cookers and kitchen stoves | 3
7321 | 7321.83 | Stoves, ranges, grates, cookers (including those with subsidiary boilers for central heating), barbecues, braziers, gas-rings, plate warmers and similar non-electric domestic appliances, and parts thereof, of iron or steel - other appliances: for solid fuel : clay tandoor (oven with iron or steel body and earthen grates) | 2
7401 | 7401.10 | Copper mattes; cement copper (precipitated copper) - copper mattes | 1
7401 | 7401.20 | Copper mattes; cement copper (precipitated copper) - cement copper (precipitated copper) | 1
7403 | 7403.23 | Refined copper and copper alloys, unwrought - copper alloys : copper-nickel base alloys( cupro-nickel) or copper-nickel-zinc base alloys (nickel silver) : copper-nickel base alloys (cupro-nickel) | 2
7407 | 7407.22 | Copper bars, rods and profiles - of copper alloys : of copper-nickel base alloys (cupro-nickel) or copper-nickel-zinc base alloys (nickel silver) : hollow bars | 2
7418 | 7418.11 | Table, kitchen or other household articles and parts thereof, of copper; pot scourers and scouring or polishing pads, gloves and the like, of copper; sanitary ware and parts thereof, of copper - table, kitchen or other household articles and parts thereof; pot scourers and scouring or polishing pads, gloves and the like : pot scourers and scouring or polishing pads, gloves and the like | 1
7418 | 7418.19 | Copper; table, kitchen or other household articles and parts thereof; pot scourers, scouring, polishing pads, gloves and the like; sanitary ware and parts thereof | 0
7419 | 7419.10 | Chain and parts thereof | 3
7419 | 7419.91 | Other articles of copper - other : cast, moulded, stamped or forged, but not further worked | 1
7419 | 7419.99 | Copper; articles thereof n.e.c. in chapter 74 | 5
7615 | 7615.11 | Table, kitchen or other household articles and parts thereof, of aluminium; pot scourers and scouring or polishing pads, gloves and the like, of aluminium; sanitary ware and parts thereof, of aluminium - table, kitchen or other household articles and parts thereof; pot scourers and scouring or polishing pads, gloves and the like : pot scourers and scouring or polishing pads, gloves and the like | 1
7615 | 7615.19 | Aluminium; table, kitchen or other household articles and parts thereof, pot scourers and scouring or polishing pads, gloves and the like, sanitary ware and parts thereof | 0
8101 | 8101.95 | Tungsten (wolfram) and articles thereof, including waste and scrap - other: - bars and rods, other than those obtained simply by sintering, profiles, plates, sheets, strip and foil: hollow bars and rods | 2
8103 | 8103.90 | Tantalum and articles thereof, including waste and scrap - other | 1
8106 | 8106.00 | Bismuth and articles thereof, including waste and scrap | 4
8109 | 8109.20 | Zirconium and articles thereof, including waste and scrap unwrought zirconium; powders | 1
8109 | 8109.30 | Zirconium and articles thereof, including waste and scrap waste and scrap | 1
8109 | 8109.90 | Zirconium and articles thereof, including waste and scrap other | 1
8112 | 8112.30 | Beryllium, chromium, germanium, vanadium, gallium, hafnium, indium, niobium (columbium), rhenium and thallium, and articles of these metals, including waste and scrap - germanium:unwrought | 4
8112 | 8112.40 | Beryllium, chromium, germanium, vanadium, gallium, hafnium, indium, niobium (columbium), rhenium and thallium, and articles of these metals, including waste and scrap - vanadium:unwrought | 4
8205 | 8205.80 | Anvils; portable forges; hand or pedal-operated grinding wheels with frameworks | 0
8418 | 8418.22 | Refrigerators, freezers and other refrigerating or freezing equipment, electric or other; heat pumps other than air conditioning machines of heading 8415 - refrigerators, household type: absorption/type, electrical | 1
8419 | 8419.31 | Machinery, plant or laboratory equipment, whether or not electrically heated (excluding furnaces, ovens and other equipment of heading 8514), for the treatment of materials by a process involving a change of temperature such as heating, cooking, roasting, distilling, rectifying, sterilising, pasteurising, steaming, drying, evaporating, vaporising, condensing or cooling, other than machinery or plant of a kind used for domestic purposes; instantaneous or storage water heaters, non-electric - dryers: for agricultural products | 1
8419 | 8419.32 | Machinery, plant or laboratory equipment, whether or not electrically heated (excluding furnaces, ovens and other equipment of heading 8514), for the treatment of materials by a process involving a change of temperature such as heating, cooking, roasting, distilling, rectifying, sterilising, pasteurising, steaming, drying, evaporating, vaporising, condensing or cooling, other than machinery or plant of a kind used for domestic purposes; instantaneous or storage water heaters, non-electric - dryers: for wood, paper pulp, paper or paper, board | 1
8424 | 8424.81 | Mechanical appliances (whether or not handoperated) for projecting, dispersing or spraying liquids or powders; fire extinguishers, whether or not charged; spray guns and similar appliances; steam or sand blasting machines and similar jet projecting machines- other appliances: agricultural or horticultural | 1
8425 | 8425.20 | Pulley tackle and hoists other than skip hoists; winches and capstans; jacks pit head winding gear; winches specially designed for use underground | 1
8428 | 8428.50 | Other lifting, handling, loading or unloading machinery (for example, lifts, escalators, conveyors, teleferics) - mine wagon pushers, locomotive or wagon traversers, wagon tippers and similar railway wagon handling equipment: wagon marshalling equipment | 3
8432 | 8432.30 | Agricultural, horticultural or forestry machinery for soil preparation or cultivation; lawn or sportsground rollers seeders, planters and transplanters | 1
8432 | 8432.40 | Agricultural, horticultural or forestry machinery for soil preparation or cultivation; lawn or sportsground rollers manure spreaders and fertilizer distributors | 1
8442 | 8442.10 | Machinery, apparatus and equipment (other than the machine-tools of headings 8456 to 8465), for type-founding or type-setting, for preparing or making printing blocks, plates, cylinders or other printing components; printing type, blocks, plates, cylinders and other printing components; blocks, plates, cylinders and lithographic stones, prepared for printing purposes (for example, planed, grained or polished) phototype-setting and composing machines | 1
8442 | 8442.20 | Machinery, apparatus and equipment (other than the machine-tools of headings 8456 to 8465), for type-founding or type-setting, for preparing or making printing blocks, plates, cylinders or other printing components; printing type, blocks, plates, cylinders and other printing components; blocks, plates, cylinders and lithographic stones, prepared for printing purposes (for example, planed, grained or polished) machinery, apparatus and equipment for type-setting or composing by other processes, with or without founding device: stereo-typing apparatus | 4
8443 | 8443.21 | Printing machinery used for printing by means of the printing type, blocks, plates, cylinders and other printing components of heading 8442; ink-jet printing machines, other than those of heading 8471; machines for uses ancillary to printing - letterpress printing machinery, excluding flexographic printing: reel fed | 1
8443 | 8443.29 | Printing machinery used for printing by means of the printing type, blocks, plates, cylinders and other printing components of heading 8442; ink-jet printing machines, other than those of heading 8471; machines for uses ancillary to printing - letterpress printing machinery, excluding flexographic printing: other | 1
8443 | 8443.30 | Printing machinery used for printing by means of the printing type, blocks, plates, cylinders and other printing components of heading 8442; ink-jet printing machines, other than those of heading 8471; machines for uses ancillary to printing flexographic printing machinery | 1
8443 | 8443.40 | Printing machinery used for printing by means of the printing type, blocks, plates, cylinders and other printing components of heading 8442; ink-jet printing machines, other than those of heading 8471; machines for uses ancillary to printing:- gravure printing machinery | 1
8443 | 8443.51 | Printing machinery used for printing by means of the printing type, blocks, plates, cylinders and other printing components of heading 8442; ink-jet printing machines, other than those of heading 8471; machines for uses ancillary to printing - other printing machinery: ink-jet printing machines | 1
8443 | 8443.59 | Printing machinery used for printing by means of the printing type, blocks, plates, cylinders and other printing components of heading 8442; ink-jet printing machines, other than those of heading 8471; machines for uses ancillary to printing - other printing machinery: other: flat bed printing presses | 6
8443 | 8443.60 | Printing machinery used for printing by means of the printing type, blocks, plates, cylinders and other printing components of heading 8442; ink-jet printing machines, other than those of heading 8471; machines for uses ancillary to printing - other printing machinery: machines for uses ancillary to printing: automatic feeders and sheet delivering machine | 4
8443 | 8443.90 | Printing machinery used for printing by means of the printing type, blocks, plates, cylinders and other printing components of heading 8442; ink-jet printing machines, other than those of heading 8471; machines for uses ancillary to printing - - parts: parts of printing presses | 2
8448 | 8448.41 | Auxiliary machinery for use with machines of heading 8444, 8445, 8446 or 8447 (for example, dobbies, jacquards, automatic stop motions, shuttle changing mechanisms); parts and accessories suitable for use solely or principally with the machines of this heading or of heading 8444, 8445, 8446 or 8447 (for example, spindles and spindle flyers, card clothing, combs, extruding nipples, shuttles, healds and heald frames, hosiery needles) - parts and accessories of weaving machines (looms) or of their auxiliary machinery : 8448 41 - shuttles: of cotton weaving machinery | 7
8452 | 8452.40 | Furniture, bases and covers for sewing machines and parts thereof | 0
8456 | 8456.10 | Machine-tools for working any material by removal of material, by laser or other light or photon beam, ultra-sonic, electro-discharge, electrochemical, electron beam, ionic-beam or plasma arc processes - operated by laser or other light or photonbeam processes | 1
8456 | 8456.91 | Machine-tools for working any material by removal of material, by laser or other light or photon beam, ultra-sonic, electro-discharge, electrochemical, electron beam, ionic-beam or plasma arc processes - other: for dry-etching patterns on semi-conductor materials | 1
8456 | 8456.99 | Machine-tools for working any material by removal of material, by laser or other light or photon beam, ultra-sonic, electro-discharge, electrochemical, electron beam, ionic-beam or plasma arc processes - other: other - electro chemical machines | 2
8459 | 8459.40 | Other boring machines | 4
8460 | 8460.11 | Machine-tools for deburring, sharpening, grinding, honing, lapping, polishing or otherwise finishing metal, or cermets by means of grinding stones, abrasives or polishing products, other than gear cutting, gear grinding or gear finishing machines of heading 8461 - flat-surface grinding machines, in which the positioning in any one axis can be set up to an accuracy of at least 0.01 mm:numerically controlled | 1
8460 | 8460.21 | Machine-tools for deburring, sharpening, grinding, honing, lapping, polishing or otherwise finishing metal, or cermets by means of grinding stones, abrasives or polishing products, other than gear cutting, gear grinding or gear finishing machines of heading 8461 - other grinding machines, in which the positioning in any one axis can be set up to an accuracy of at least 0.01 mm: numerically controlled | 1
8462 | 8462.10 | Forging or die-stamping machines (including presses) and hammers | 7
8462 | 8462.21 | Machine-tools (including presses) for working metal by forging, hammering or die-stamping; machine-tools (including presses) for working metal by bending, folding, straightening, flattening, shearing, punching or notching; presses for working metal or metal carbides, not specified above - bending, folding, straightening or flattening machines (including presses): numerically controlled | 1
8462 | 8462.31 | Machine-tools (including presses) for working metal by forging, hammering or die-stamping; machine-tools (including presses) for working metal by bending, folding, straightening, flattening, shearing, punching or notching; presses for working metal or metal carbides, not specified above- shearing machines (including presses), other than combined punching and shearing machines : numerically controlled | 1
8462 | 8462.41 | Machine-tools (including presses) for working metal by forging, hammering or die-stamping; machine-tools (including presses) for working metal by bending, folding, straightening, flattening, shearing, punching or notching; presses for working metal or metal carbides, not specified above- punching or notching machines (including presses), including combined punching and shearing machines: numerically controlled | 1
8462 | 8462.91 | Hydraulic presses | 2
8462 | 8462.99 | Machine-tools (including presses) for working metal by forging, hammering or die forging (excluding rolling mills); machine-tools (including presses, slitting lines and cut-to-length lines) for working metal by bending, folding, straightening, flattening, | 13
8470 | 8470.40 | Calculating machines and pocket-size data recording, reproducing and displaying machines with calculating functions; accounting machines, postage-franking machines, ticket-issuing machines and similar machines, incorporating a calculating device; cash registers - accounting machines : electrically operated | 2
8471 | 8471.10 | Automatic data processing machines and units thereof; magnetic or optical readers, machines for transcribing data on to data media in coded form and machines for processing such data, not elsewhere specified or included analogue or hybrid automatic data processing machines | 1
8472 | 8472.20 | Other office machines (for example, hectograph or stencil duplicating machines, addressing machines, automatic banknote dispensers, coin sorting machines, coin counting or wrapping machines, pencil-sharpening machines, perforating or stapling machines) addressing machines and address plate embossing machines | 1
8473 | 8473.10 | Parts and accessories (other than covers, carrying cases and the like) suitable for use solely or principally with machines of headings 8469 to 8472 parts and accessories of the machines of heading 8469 | 1
8505 | 8505.30 | Electro-magnets; permanent magnets and articles intended to become permanent magnets after magnetisation; electro-magnetic or permanent magnet chucks, clamps and similar holding devices; electro-magnetic couplings, clutches and brakes; electro-magnetic lifting heads - electro-magnetic lifting heads | 1
8507 | 8507.40 | Electric accumulators, including separators therefor, whether or not rectangular (including square) nickel-iron | 1
8509 | 8509.10 | Electro-mechanical domestic appliances, with self-contained electric motor vacuum cleaners, including dry and wet vacuum cleaners | 1
8509 | 8509.20 | Electro-mechanical domestic appliances, with self-contained electric motor floor polishers | 1
8509 | 8509.30 | Electro-mechanical domestic appliances, with self-contained electric motor kitchen waste disposers | 1
8514 | 8514.10 | Industrial or laboratory electric furnaces and ovens (including those functioning by induction or dielectric loss); other industrial or laboratory equipment for the heat treatment of materials by induction or dielectric loss resistance heated furnaces and ovens | 1
8514 | 8514.30 | Other furnaces and ovens | 2
8517 | 8517.12 | Telephones for cellular networks or for other wireless networks | 4
8517 | 8517.19 | Electrical apparatus for line telephony or line telegraphy, including line telephone sets with cordless handsets and telecommunication apparatus for carrier-current line systems or for digital line systems; videophones - telephone sets; videophones: - other: - telephone sets: push button type | 4
8517 | 8517.21 | Electrical apparatus for line telephony or line telegraphy, including line telephone sets with cordless handsets and telecommunication apparatus for carrier-current line systems or for digital line systems; videophones - facsimile machines and teleprinters: fascimile machines | 1
8517 | 8517.22 | Electrical apparatus for line telephony or line telegraphy, including line telephone sets with cordless handsets and telecommunication apparatus for carrier-current line systems or for digital line systems; videophones - facsimile machines and teleprinters: teleprinters | 1
8517 | 8517.30 | Electrical apparatus for line telephony or line telegraphy, including line telephone sets with cordless handsets and telecommunication apparatus for carrier-current line systems or for digital line systems; videophones telephonic or telegraphic switching apparatus | 1
8517 | 8517.50 | Electrical apparatus for line telephony or line telegraphy, including line telephone sets with cordless handsets and telecommunication apparatus for carrier-current line systems or for digital line systems; videophones - other apparatus, for carrier-current line systems or for digital line systems: plcc equipment | 12
8517 | 8517.70 | Parts | 2
8517 | 8517.80 | Electrical apparatus for line telephony or line telegraphy, including line telephone sets with cordless handsets and telecommunication apparatus for carrier-current line systems or for digital line systems; videophones - other apparatus: attachments for telephones | 4
8517 | 8517.90 | Electrical apparatus for line telephony or line telegraphy, including line telephone sets with cordless handsets and telecommunication apparatus for carrier-current line systems or for digital line systems; videophones - parts: populated, loaded or stuffed printed circuit boards | 2
8519 | 8519.10 | Turntables (record-decks), record-players, cassette-players and other sound reproducing apparatus, not incorporating a sound recording device coin or disc-operated record-players | 1
8519 | 8519.21 | Turntables (record-decks), record-players, cassette-players and other sound reproducing apparatus, not incorporating a sound recording device - other record-players: without loudspeaker | 1
8519 | 8519.29 | Turntables (record-decks), record-players, cassette-players and other sound reproducing apparatus, not incorporating a sound recording device - other record-players: other | 1
8519 | 8519.31 | Turntables (record-decks), record-players, cassette-players and other sound reproducing apparatus, not incorporating a sound recording device - turntables (record-decks): with automatic record changing mechanism | 1
8519 | 8519.39 | Turntables (record-decks), record-players, cassette-players and other sound reproducing apparatus, not incorporating a sound recording device - turntables (record-decks): other | 1
8519 | 8519.40 | Turntables (record-decks), record-players, cassette-players and other sound reproducing apparatus, not incorporating a sound recording device transcribing machines | 1
8519 | 8519.50 | Sound recording or reproducing apparatus -telephone answering machines | 1
8519 | 8519.92 | Turntables (record-decks), record-players, cassette-players and other sound reproducing apparatus, not incorporating a sound recording device - other sound reproducing apparatus: pocket-size cassette players | 1
8519 | 8519.93 | Turntables (record-decks), record-players, cassette-players and other sound reproducing apparatus, not incorporating a sound recording device - other sound reproducing apparatus: other, cassette-type | 1
8519 | 8519.99 | Turntables (record-decks), record-players, cassette-players and other sound reproducing apparatus, not incorporating a sound recording device - other : - other sound reproducing apparatus: audio compact disc players | 5
8523 | 8523.11 | Prepared unrecorded media for sound recording or similar recording of other phenomena, other than products of chapter 37 - magnetic tapes: - of a width not exceeding 4 mm : - for recording sound : audio cassettes | 5
8523 | 8523.12 | Prepared unrecorded media for sound recording or similar recording of other phenomena, other than products of chapter 37 - magnetic tapes: - of a width exceeding 4 mm but not exceeding 6.5 mm: - for recording sound: audio cassettes | 5
8523 | 8523.13 | Prepared unrecorded media for sound recording or similar recording of other phenomena, other than products of chapter 37 - magnetic tapes: - of a width exceeding 6.5 mm: - for recording sound : audio cassette tape of width exceeding 6.5 mm but not exceeding 35 mm, and 16 mm sprocket tapes | 10
8523 | 8523.20 | Prepared unrecorded media for sound recording or similar recording of other phenomena, other than products of chapter 37 - magnetic discs: hard disc pack | 3
8523 | 8523.30 | Prepared unrecorded media for sound recording or similar recording of other phenomena, other than products of chapter 37 cards incorporating a magnetic stripe | 1
8523 | 8523.40 | Optical media | 0
8523 | 8523.90 | Prepared unrecorded media for sound recording or similar recording of other phenomena, other than products of chapter 37 - other: matrices for the production of records; prepared record blanks | 7
8524 | 8524.10 | Records, tapes and other recorded media for sound or other similarly recorded phenomena, including matrices and masters for the production of records, but excluding products of chapter 37 - gramophone records: learning aids, such as, language records | 2
8524 | 8524.31 | Records, tapes and other recorded media for sound or other similarly recorded phenomena, including matrices and masters for the production of records, but excluding products of chapter 37 - discs for laser reading systems: - for reproducing phenomena other than sound or image: - software: information technology software | 3
8524 | 8524.32 | Records, tapes and other recorded media for sound or other similarly recorded phenomena, including matrices and masters for the production of records, but excluding products of chapter 37 - discs for laser reading systems: - for reproducing sound only: pre-recorded audio compact discs or pre-recorded audio mini discs | 2
8524 | 8524.39 | Records, tapes and other recorded media for sound or other similarly recorded phenomena, including matrices and masters for the production of records, but excluding products of chapter 37 - discs for laser reading systems: - other: video compact disc of educational nature | 4
8524 | 8524.40 | Records, tapes and other recorded media for sound or other similarly recorded phenomena, including matrices and masters for the production of records, but excluding products of chapter 37 -magnetic tapes for reproducing phenomena other than sound or image: - software: information technology software | 3
8524 | 8524.51 | Records, tapes and other recorded media for sound or other similarly recorded phenomena, including matrices and masters for the production of records, but excluding products of chapter 37 - other magnetic tapes: - of a width not exceeding 4 mm: - learning aids: audio cassettes | 7
8524 | 8524.52 | Records, tapes and other recorded media for sound or other similarly recorded phenomena, including matrices and masters for the production of records, but excluding products of chapter 37 - other magnetic tapes: - of a width exceeding 4 mm but not exceeding 6.5 mm: - learning aids: audio cassettes | 7
8524 | 8524.53 | Records, tapes and other recorded media for sound or other similarly recorded phenomena, including matrices and masters for the production of records, but excluding products of chapter 37 - other magnetic tapes: - of a width exceeding 6.5 mm : - learning aids: audio cassettes | 7
8524 | 8524.60 | Records, tapes and other recorded media for sound or other similarly recorded phenomena, including matrices and masters for the production of records, but excluding products of chapter 37 - cards incorporating a magnetic stripe | 1
8525 | 8525.10 | Transmission apparatus for radio-telephony, radiotelegraphy, radio-broadcasting or television, whether or not incorporating reception apparatus or sound recording or reproducing apparatus; television cameras; still image video cameras and other video camera recorders; digital cameras - transmission apparatus: radio broadcast transmitter | 6
8525 | 8525.20 | Transmission apparatus for radio-telephony, radiotelegraphy, radio-broadcasting or television, whether or not incorporating reception apparatus or sound recording or reproducing apparatus; television cameras; still image video cameras and other video camera recorders; digital cameras - transmission apparatus incorporating reception apparatus: - two way radio communication equipment: walkie talkie set | 11
8525 | 8525.30 | Transmission apparatus for radio-telephony, radiotelegraphy, radio-broadcasting or television, whether or not incorporating reception apparatus or sound recording or reproducing apparatus; television cameras; still image video cameras and other video camera recorders; digital camerastelevision cameras | 1
8525 | 8525.40 | Transmission apparatus for radio-telephony, radiotelegraphy, radio-broadcasting or television, whether or not incorporating reception apparatus or sound recording or reproducing apparatus; television cameras; still image video cameras and other video camera recorders; digital camerasstill image video cameras and other video camera recorders; digital cameras | 1
8525 | 8525.80 | Television cameras, digital cameras and video camera recorders | 4
8527 | 8527.31 | Reception apparatus for radio-telephony, radiotelegraphy or radio-broadcasting, whether or not combined, in the same housing, with sound recording or reproducing apparatus or a clock - other radio-broadcast receivers, including apparatus capable of receiving also radiotelephony or radio-telegraphy: combined with sound recording or reproducing apparatus | 1
8527 | 8527.32 | Reception apparatus for radio-telephony, radiotelegraphy or radio-broadcasting, whether or not combined, in the same housing, with sound recording or reproducing apparatus or a clock - other radio-broadcast receivers, including apparatus capable of receiving also radiotelephony or radio-telegraphy: not combined with sound recording or reproducing apparatus but combined with a clock | 1
8527 | 8527.39 | Reception apparatus for radio-telephony, radiotelegraphy or radio-broadcasting, whether or not combined, in the same housing, with sound recording or reproducing apparatus or a clock - other radio-broadcast receivers, including apparatus capable of receiving also radiotelephony or radio-telegraphy: other | 1
8527 | 8527.90 | Reception apparatus for radio-telephony, radiotelegraphy or radio-broadcasting, whether or not combined, in the same housing, with sound recording or reproducing apparatus or a clock - other apparatus: - radio communication receivers: radio pagers | 4
8528 | 8528.12 | Reception apparatus for television, whether or not incorporating radio-broadcast receivers or sound or video recording or reproducing apparatus; video monitors and video projectors - reception apparatus for television, whether or not incorporating radio-broadcast receivers or sound or video recording or reproducing apparatus: - colour : television set of screen size upto 36 cm | 11
8528 | 8528.13 | Reception apparatus for television, whether or not incorporating radio-broadcast receivers or sound or video recording or reproducing apparatus; video monitors and video projectors - reception apparatus for television, whether or not incorporating radio-broadcast receivers or sound or video recording or reproducing apparatus: black and white or other monochrome: liquid crystal display television set of screen size below 25 cm | 2
8528 | 8528.21 | Reception apparatus for television, whether or not incorporating radio-broadcast receivers or sound or video recording or reproducing apparatus; video monitors and video projectors - video monitors: - colour: professional monitors for studio use (of resolution 800 lines and above) | 2
8528 | 8528.22 | Reception apparatus for television, whether or not incorporating radio-broadcast receivers or sound or video recording or reproducing apparatus; video monitors and video projectors - video monitors: black and white or other monochrome | 1
8528 | 8528.30 | Reception apparatus for television, whether or not incorporating radio-broadcast receivers or sound or video recording or reproducing apparatus; video monitors and video projectors - video projectors: colour, with flat panel screen | 3
8528 | 8528.41 | Monitors and projectors, not incorporating television reception apparatus. reception apparatus for television, whether or not incorporating radio-broadcast receiver or sound or video recording or reproducing apparatus - cathode-ray tube monitors -- of a kind solely or principally used in an automatic data processing system of heading 8471 | 1
8528 | 8528.51 | Monitors and projectors, not incorporating television reception apparatus. reception apparatus for television, whether or not incorporating radio-broadcast receiver or sound or video recording or reproducing apparatus - other monitors -- of a kind solely or principally used in an automatic data processing system of heading 8471 | 1
8528 | 8528.61 | Monitors and projectors, not incorporating television reception apparatus. reception apparatus for television, whether or not incorporating radio-broadcast receiver or sound or video recording or reproducing apparatus - projectors | 1
8539 | 8539.50 | Light-emitting diode (LED) lamps | 1
8541 | 8541.40 | Photosensitive semi-conductor devices, including photo voltaic cells whether or not assembled in modules or made up into panels; light-emitting diodes (LED) | 5
8541 | 8541.50 | Diodes, transistors and similar semi-conductor devices; photosensitive semi-conductor devices, including photovoltaic cells whether or not assembled in modules or made up into panels; light emitting diodes; mounted piezo-electric crystals other semi-conductors devices | 1
8542 | 8542.10 | Electronic integrated circuits and micro-assemblies -cards incorporating an electronic integrated circuit *smarv cards): sim cards | 3
8542 | 8542.21 | Electronic integrated circuits and micro-assemblies - monolithic integrated circuits: digital | 1
8542 | 8542.29 | Electronic integrated circuits and micro-assemblies - monolithic integrated circuits: - other: cards incorporating only a single electronic integrated circuit with optical strip | 2
8542 | 8542.60 | Electronic integrated circuits and micro-assemblies hybrid integrated circuits | 1
8542 | 8542.70 | Electronic integrated circuits and micro-assemblies electronic microassemblies | 1
8543 | 8543.11 | Electrical machines and apparatus having individual functions, not specified or included elsewhere in this chapter - particle accelerators: ion implanters for doping semi-conductor materials | 1
8543 | 8543.19 | Electrical machines and apparatus having individual functions, not specified or included elsewhere in this chapter - particle accelerators: - other: vane graff, cock-croft, walton accelerators | 3
8543 | 8543.81 | Electrical machines and apparatus having individual functions, not specified or included elsewhere in this chapter - other machines and apparatus: proximity cards and tags | 1
8543 | 8543.89 | Electrical machines and apparatus having individual functions, not specified or included elsewhere in this chapter - other machines and apparatus: - other: metal detectors | 27
8544 | 8544.41 | Insulated (including enamelled or anodised) wire, cable (including co-axial cable) and other insulated electric conductors, whether or not fitted with connectors; optical fibre cables, made up of individually sheathed fibres, whether or not assembled with electric conductors or fitted with connectors - other electric conductors, for a voltage not exceeding 80 v: - fitted with connectors: - telephone cables: dry core paper insulated | 6
8544 | 8544.51 | Insulated (including enamelled or anodised) wire, cable (including co-axial cable) and other insulated electric conductors, whether or not fitted with connectors; optical fibre cables, made up of individually sheathed fibres, whether or not assembled with electric conductors or fitted with connectors - other electric conductors, for a voltage exceeding 80 v but not exceeding 1,000 v: - fitted with connectors: paper insulated | 6
8544 | 8544.59 | Insulated (including enamelled or anodised) wire, cable (including co-axial cable) and other insulated electric conductors, whether or not fitted with connectors; optical fibre cables, made up of individually sheathed fibres, whether or not assembled with electric conductors or fitted with connectors - other electric conductors, for a voltage exceeding 80 v but not exceeding 1,000 v: - other : paper insulated | 6
8548 | 8548.10 | Waste and scrap of primary cells, primary batteries and electric accumulators; spent primary cells, spent primary batteries and spent electric accumulators | 3
8548 | 8548.90 | Waste and scrap of primary cells, primary batteries and electric accumulators; spent primary cells, spent primary batteries and spent electric ccumulators; electrical parts of machinery or apparatus, not specified or included elsewhere in this chapter - other | 1
8606 | 8606.20 | Railway or tramway goods vans and wagons, not self-propelled - insulated or refrigerated vans and wagons, other than those of sub-heading 8606 10 | 1
8701 | 8701.20 | Road tractors for semi-trailers | 2
8701 | 8701.90 | Tractors; (other than tractors of heading no 8709) | 2
8708 | 8708.31 | Parts and accessories of the motor vehicles of headings 8701 to 8705 brakes and servo-brakes and parts thereof mounted brake linings | 1
8708 | 8708.39 | Parts and accessories of the motor vehicles of headings 8701 to 8705 brakes and servo-brakes and parts thereof other | 1
8708 | 8708.60 | Parts and accessories of the motor vehicles of headings 8701 to 8705 brakes and servo-brakes and parts thereof non-driving axles and parts thereof | 1
8801 | 8801.10 | Balloons and dirigibles; gliders, hang gliders and other non-powered aircraft gliders and hang gliders | 1
8801 | 8801.90 | Balloons and dirigibles; gliders, hang gliders and other non-powered aircraft - other: balloons | 2
8903 | 8903.10 | Yachts and other vessels for pleasure or sports; rowing boats and canoes inflatable | 1
8903 | 8903.91 | Yachts and other vessels for pleasure or sports; rowing boats and canoes - other : sail boats, with or without auxiliary motor | 1
8903 | 8903.92 | Yachts and other vessels for pleasure or sports; rowing boats and canoes - other : motorboats, other than outboard motorboats | 1
9006 | 9006.10 | Photographic (other than cinematographic) cameras; photographic flashlight apparatus and flash bulbs other than discharge lamps of heading 8539 cameras of a kind used for preparing printing plates or cylinders | 1
9006 | 9006.20 | Photographic (other than cinematographic) cameras; photographic flashlight apparatus and flash bulbs other than discharge lamps of heading 8539 cameras of a kind used for recording documents on microfilm, microfiche or other microforms | 1
9006 | 9006.51 | Photographic (other than cinematographic) cameras; photographic flashlight apparatus and flash bulbs other than discharge lamps of heading 8539 - other cameras: with a through-the-lens view-finder [single lens reflex (slr)] for roll film of a width not exceeding 35 mm | 1
9006 | 9006.52 | Photographic (other than cinematographic) cameras; photographic flashlight apparatus and flash bulbs other than discharge lamps of heading 8539 - other cameras: other, for roll film of a width less than 35 mm | 1
9006 | 9006.62 | Photographic (other than cinematographic) cameras; photographic flashlight apparatus and flash bulbs other than discharge lamps of heading 8539 - photographic flashlight apparatus and flashbulbs: flashbulbs, flashcubes and the like | 1
9010 | 9010.41 | Apparatus and equipment for photographic (including cinematographic) laboratories (including apparatus for the projection or drawing of circuit patterns on sensitised semiconductor materials), not specified or included elsewhere in this chapter; negatoscopes; projection screens - apparatus for the projection or drawing of circuit patterns on sensitised semiconductor materials: direct write-on-wafer apparatus | 1
9010 | 9010.42 | Apparatus and equipment for photographic (including cinematographic) laboratories (including apparatus for the projection or drawing of circuit patterns on sensitised semiconductor materials), not specified or included elsewhere in this chapter; negatoscopes; projection screens - apparatus for the projection or drawing of circuit patterns on sensitised semiconductor materials: step and repeat aligners | 1
9010 | 9010.49 | Apparatus and equipment for photographic (including cinematographic) laboratories (including apparatus for the projection or drawing of circuit patterns on sensitised semiconductor materials), not specified or included elsewhere in this chapter; negatoscopes; projection screens - apparatus for the projection or drawing of circuit patterns on sensitised semiconductor materials: other | 1
9011 | 9011.11 | Arabica plantation | 0
9011 | 9011.12 | Arabica cherry | 0
9011 | 9011.13 | Rob Parchment | 0
9011 | 9011.14 | Rob cherry | 0
9027 | 9027.40 | Instruments and apparatus for physical or chemical analysis (for example, polarimeters, refractometers, spectrometers, gas or smoke analysis apparatus); instruments and apparatus for measuring or checking viscosity, porosity, expansion, surface tension or the like; instruments and apparatus for measuring or checking quantities of heat, sound or light (including exposure meters); microtomes exposure meters | 1
9027 | 9027.80 | Other instruments and apparatus | 5
9030 | 9030.83 | Oscilloscopes, spectrum analysers and other instruments and apparatus for measuring or checking electrical quantities, excluding meters of heading 9028; instruments and apparatus for measuring or detecting alpha, beta, gamma, x-ray, cosmic or other ionising radiations- other instruments and apparatus: other, with a recording device | 1
9031 | 9031.30 | Measuring or checking instruments, appliances and machines, not specified or included elsewhere in this chapter; profile projectors profile projectors | 1
9101 | 9101.12 | Wrist-watches, pocket-watches and other watches, including stop-watches, with case of precious metal or of metal clad with precious metal - wrist-watches, electrically operated whether or not incorporating a stop-watch facility: with opto-electronic display only | 1
9105 | 9105.10 | Clocks, other, n.e.c. | 1
9106 | 9106.20 | Time of day recording apparatus and apparatus for measuring, recording or otherwise indicating intervals of time, with clock or watch movement or with synchronous motor (for example, time-registers, timerecorders) parking meters | 1
9109 | 9109.91 | Seed | 0
9109 | 9109.92 | Powder | 0
9109 | 9109.93 | Husk | 0
9114 | 9114.10 | Springs, including hair-springs | 2
9208 | 9208.20 | Musical boxes, fairground organs, mechanical street organs, mechanical singing birds, musical saws and other musical instruments not falling within any other heading of this chapter; decoy calls of all kinds; whistles, call horns and other mouth-blown sound signalling instruments other | 1
9209 | 9209.10 | Parts (for example, mechanisms for musical boxes) and accessories (for example, cards, discs and rolls for mechanical instruments) of musical instruments; metronomes, tuning forks and pitch pipes of all kindsmetronomes, tuning forks and pitch pipes | 1
9209 | 9209.20 | Parts (for example, mechanisms for musical boxes) and accessories (for example, cards, discs and rolls for mechanical instruments) of musical instruments; metronomes, tuning forks and pitch pipes of all kindsmechanisms for musical boxes | 1
9209 | 9209.93 | Parts (for example, mechanisms for musical boxes) and accessories (for example, cards, discs and rolls for mechanical instruments) of musical instruments; metronomes, tuning forks and pitch pipes of all kinds- other: parts and accessories for the musical instruments of heading 9203 | 1
9306 | 9306.10 | Bombs , grenades, torpedoes, mines, missiles, and similar munitions of war and parts thereof; cartridges and other ammunition and projectiles and parts thereof, including shot and cartridge wads cartridges for riveting or similar tools or for captive-bolt humane killers and parts thereof | 1
9401 | 9401.30 | SEATS (OTHER THAN THOSE OF HEADING 9402), WHETHER OR NOT CONVERTIBLE INTO BEDS, AND PARTS THEREOF Swivel seats and variable height adjustment | 1
9401 | 9401.40 | SEATS (OTHER THAN THOSE OF HEADING 9402), WHETHER OR NOT CONVERTIBLE INTO BEDS, AND PARTS THEREOF Seats other than garden seats or camping equipment, convertible into beds | 1
9401 | 9401.50 | Seats (other than those of heading 9402), whether or not convertible into beds, and parts thereof seats of cane, osier, bamboo or similar materials | 1
9401 | 9401.51 | Seats (other than those of heading 9402), whether or not convertible into beds, and parts thereof -seats of cane, osier, bamboo or similar materials: -- of bamboo or rattan | 1
9401 | 9401.90 | SEATS (OTHER THAN THOSE OF HEADING 9402), WHETHER OR NOT CONVERTIBLE INTO BEDS, AND PARTS THEREOF Parts | 1
9403 | 9403.80 | Other furniture and parts thereof - furniture of other materials, including cane, osier, bamboo or similar materials: furniture of wicker work or bamboo | 2
9403 | 9403.81 | Other furniture and parts thereof - furniture of other materials, including cane, osier, bamboo or similar materials: of bamboo or rattan | 1
9403 | 9403.90 | OTHER FURNITURE AND PARTS THEREOF -Parts | 1
9405 | 9405.10 | Chandeliers and other electric ceiling or wall lighting fittings, excluding those of a kind used for lighting public open spaces or thorough fares | 3
9405 | 9405.20 | Electric table, desk, bedside or floor-standing lamps | 2
9405 | 9405.30 | LAMPS AND LIGHTING FITTINGS INCLUDING SEARCHLIGHTS AND SPOTLIGHTS AND PARTS THEREOF, NOT ELSEWHERE SPECIFIED OR INCLUDED; ILLUMINATED SIGNS, ILLUMINATED NAME-PLATES AND THE LIKE, HAVING A PERMANENTLY FIXED LIGHT SOURCE, AND PARTS THEREOF NOT ELSEWHERE SPECIFIED OR INCLUDEDLighting sets of a kind used for Christmas trees | 1
9405 | 9405.40 | Other electric lamps and lighting fittings | 2
9405 | 9405.60 | Illuminated signs, illuminated name-plates and the like | 2
9406 | 9406.00 | Prefabricated buildings | 6
9503 | 9503.10 | Other toys; reduced-size (*scale*) models and similar recreational models, working or not; puzzles of all kinds electric trains, including tracks, signals and other accessories therefore | 1
9503 | 9503.20 | Other toys; reduced-size (scale) models and similar recreational models, working or not; puzzles of all kinds reduced-size (scale) model assembly kits, whether or not working models, excluding those of sub-heading 9503 10 | 1
9503 | 9503.30 | Other toys; reduced-size (*scale*) models and similar recreational models, working or not; puzzles of all kinds other construction sets and constructional toys | 1
9503 | 9503.41 | Other toys; reduced-size (*scale*) models and similar recreational models, working or not; puzzles of all kinds - toys representing animals or non-human creatures: stuffed | 1
9503 | 9503.49 | Other toys; reduced-size (scale) models and similar recreational models, working or not; puzzles of all kinds - toys representing animals or non-human creatures: - other : of wood | 4
9503 | 9503.50 | Other toys; reduced-size (*scale*) models and similar recreational models, working or not; puzzles of all kinds - toy musical instruments and apparatus: instruments and apparatus | 2
9503 | 9503.60 | Other toys; reduced-size (*scale*) models and similar recreational models, working or not; puzzles of all kinds - puzzles: of wood | 2
9503 | 9503.70 | Other toys; reduced-size (*scale*) models and similar recreational models, working or not; puzzles of all kinds - other toys, put up in sets or outfits : of plastics | 2
9503 | 9503.80 | Other toys; reduced-size (*scale*) models and similar recreational models, working or not; puzzles of all kinds - other toys and models, incorporating a motor: toys and models | 2
9503 | 9503.90 | Other toys; reduced-size (*scale*) models and similar recreational models, working or not; puzzles of all kinds - other: toy weapons | 3
9508 | 9508.90 | ROUNDABOUTS, SWINGS, SHOOTING GALLERIES AND OTHER FAIRGROUND AMUSEMENTS; TRAVELLING CIRCUSES, TRAVELLING MENAGERIES AND TRAVELLING THEATRES Other | 1
9608 | 9608.31 | Indian ink drawing pens | 0
9608 | 9608.39 | Pens; ball-point, felt tipped, other porous tipped pens; fountain pens, stylograph pens duplicating stylos, propelling or sliding pencils; parts of the foregoing, excluding those of heading no. 9609 | 0
9614 | 9614.20 | Smoking pipes (including pipe bowls) and cigar or cigarette holders, and parts thereof pipes and pipe bowls | 1
9614 | 9614.90 | Smoking pipes (including pipe bowls) and cigar or cigarette holders, and parts thereof - other : huble and buble of base metal | 3
9701 | 9701.10 | Paintings, drawings and pastels | 4
9701 | 9701.90 | Paintings, drawings and pastels, executed entirely by hand; not drawings of heading no. 4906 and not hand-painted, hand-decorated manufactured articles; collages, mosaics and similar decorative plaques | 3
9702 | 9702.00 | Original engravings, prints and lithographs | 1
9703 | 9703.00 | Original sculptures and statuary, in any material | 3
9705 | 9705.00 | Collections and collectors' pieces of zoological, botanical, mineralogical, anatomical, historical, archaeological, palaeontological, ethnographic or numismatic interest | 2
9706 | 9706.00 | Antiques of an age exceeding one hundred year | 1

## Kept headings with no subheadings (0)



## Counts

before: {"headings":1366,"subs":6417,"items":14709}
after: {"headings":1235,"subs":5626,"items":13131}

